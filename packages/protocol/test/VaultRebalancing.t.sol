// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.15;

import "forge-std/console.sol";
import {DSTestPlus} from "./utils/DSTestPlus.sol";
import {SafeERC20} from "openzeppelin-contracts/contracts/token/ERC20/utils/SafeERC20.sol";
import {TimelockController} from
  "openzeppelin-contracts/contracts/governance/TimelockController.sol";
import {Chief} from "../src/Chief.sol";
import {CoreRoles} from "../src/access/CoreRoles.sol";
import {IVault} from "../src/interfaces/IVault.sol";
import {ILendingProvider} from "../src/interfaces/ILendingProvider.sol";
import {BorrowingVaultFactory} from "../src/vaults/borrowing/BorrowingVaultFactory.sol";
import {BorrowingVault} from "../src/vaults/borrowing/BorrowingVault.sol";
import {YieldVaultFactory} from "../src/vaults/yield/YieldVaultFactory.sol";
import {YieldVault} from "../src/vaults/yield/YieldVault.sol";
import {RebalancerManager} from "../src/RebalancerManager.sol";
import {MockERC20} from "../src/mocks/MockERC20.sol";
import {MockProvider} from "../src/mocks/MockProvider.sol";
import {MockOracle} from "../src/mocks/MockOracle.sol";
import {MockFlasher} from "../src/mocks/MockFlasher.sol";
import {IFlasher} from "../src/interfaces/IFlasher.sol";
import {SafeERC20} from "openzeppelin-contracts/contracts/token/ERC20/utils/SafeERC20.sol";
import {IERC20} from "openzeppelin-contracts/contracts/token/ERC20/IERC20.sol";
import {Address} from "openzeppelin-contracts/contracts/utils/Address.sol";

contract MockProviderIdA is MockProvider {
  function providerName() public pure override returns (string memory) {
    return "ProviderA";
  }
}

contract MockProviderIdB is MockProvider {
  function providerName() public pure override returns (string memory) {
    return "ProviderB";
  }
}

contract ThiefProvider is MockProvider {
  function providerName() public pure override returns (string memory) {
    return "ThiefProvider";
  }
}

contract GreedyFlasher is IFlasher {
  using Address for address;

  function initiateFlashloan(
    address, /* asset */
    uint256, /* amount */
    address requestor,
    bytes memory requestorCalldata
  )
    external
    override
  {
    requestor.functionCall(requestorCalldata);
  }

  function getFlashloanSourceAddr(address) external view override returns (address) {
    return address(this);
  }

  function computeFlashloanFee(address, uint256) external pure override returns (uint256 fee) {
    fee = 0;
  }
}

contract MaliciousFlasher is IFlasher {
  using SafeERC20 for IERC20;
  using Address for address;

  function initiateFlashloan(
    address asset,
    uint256 amount,
    address requestor,
    bytes memory /*requestorCalldata*/
  )
    external
    override
  {
    MockERC20(asset).mint(address(this), amount);
    IERC20(asset).safeTransfer(requestor, amount);
    //changes the calldata
    bytes memory requestorCall = abi.encodeWithSelector(
      RebalancerManager.completeRebalance.selector,
      IVault(address(0)),
      0,
      amount,
      address(0),
      address(0),
      this,
      true
    );

    requestor.functionCall(requestorCall);
  }

  function getFlashloanSourceAddr(address) external view override returns (address) {
    return address(this);
  }

  function computeFlashloanFee(address, uint256) external pure override returns (uint256 fee) {
    fee = 0;
  }
}

contract ReentrantFlasher is IFlasher {
  using SafeERC20 for IERC20;
  using Address for address;

  RebalancerManager rebalancer;
  IVault bvault;
  uint256 assets;
  uint256 debt;
  IFlasher flasher;
  ILendingProvider mockProviderA;
  ILendingProvider mockProviderB;

  constructor(
    RebalancerManager rebalancer_,
    IVault bvault_,
    uint256 assets_,
    uint256 debt_,
    IFlasher flasher_,
    ILendingProvider mockProviderA_,
    ILendingProvider mockProviderB_
  ) {
    rebalancer = rebalancer_;
    bvault = bvault_;
    assets = assets_;
    debt = debt_;
    flasher = flasher_;
    mockProviderA = mockProviderA_;
    mockProviderB = mockProviderB_;
  }

  function initiateFlashloan(
    address asset,
    uint256 amount,
    address requestor,
    bytes memory /*requestorCalldata*/
  )
    external
    override
  {
    MockERC20(asset).mint(address(this), amount);
    IERC20(asset).safeTransfer(requestor, amount);

    //this call should fail in the check entry inside the RebalacerManager
    rebalancer.rebalanceVault(bvault, assets, debt, mockProviderA, mockProviderB, flasher, true);
  }

  function getFlashloanSourceAddr(address) external view override returns (address) {
    return address(this);
  }

  function computeFlashloanFee(address, uint256) external pure override returns (uint256 fee) {
    fee = 0;
  }
}

contract VaultRebalancingUnitTests is DSTestPlus, CoreRoles {
  BorrowingVaultFactory public bVaultFactory;
  BorrowingVault public bvault;

  YieldVaultFactory public yVaultFactory;
  YieldVault public yvault;

  Chief public chief;
  TimelockController public timelock;

  ILendingProvider public mockProviderA;
  ILendingProvider public mockProviderB;

  MockOracle public oracle;
  MockFlasher public flasher;
  MockERC20 public asset;
  MockERC20 public debtAsset;

  RebalancerManager public rebalancer;

  uint256 alicePkey = 0xA;
  address alice = vm.addr(alicePkey);
  uint256 bobPkey = 0xB;
  address bob = vm.addr(bobPkey);
  uint256 charliePkey = 0xC;
  address charlie = vm.addr(charliePkey);
  uint256 davidPkey = 0xD;
  address david = vm.addr(davidPkey);

  uint256 public constant DEPOSIT_AMOUNT = 1 ether;
  uint256 public constant BORROW_AMOUNT = 1000e18;

  // WETH and DAI prices: 2000 DAI/WETH
  uint256 public constant TEST_USD_PER_ETH_PRICE = 2000e18;
  uint256 public constant TEST_ETH_PER_USD_PRICE = 5e14;

  function setUp() public {
    vm.label(alice, "Alice");
    vm.label(bob, "Bob");
    vm.label(charlie, "Charlie");
    vm.label(david, "David");

    asset = new MockERC20("Test WETH", "tWETH");
    vm.label(address(asset), "tWETH");
    debtAsset = new MockERC20("Test DAI", "tDAI");
    vm.label(address(debtAsset), "tDAI");

    oracle = new MockOracle();
    _utils_setupOracle(address(asset), address(debtAsset));

    mockProviderA = new MockProviderIdA();
    mockProviderB = new MockProviderIdB();
    vm.label(address(mockProviderA), "ProviderA");
    vm.label(address(mockProviderB), "ProviderB");

    chief = new Chief(true, true);
    timelock = TimelockController(payable(chief.timelock()));
    _utils_setupTestRoles();

    bVaultFactory = new BorrowingVaultFactory(address(chief));
    yVaultFactory = new YieldVaultFactory(address(chief));

    bytes memory executionCall =
      abi.encodeWithSelector(chief.allowVaultFactory.selector, address(bVaultFactory), true);
    _callWithTimelock(address(chief), executionCall);

    executionCall =
      abi.encodeWithSelector(chief.allowVaultFactory.selector, address(yVaultFactory), true);
    _callWithTimelock(address(chief), executionCall);

    address bvaultAddr = chief.deployVault(
      address(bVaultFactory), abi.encode(address(asset), address(debtAsset), address(oracle)), "A+"
    );
    bvault = BorrowingVault(payable(bvaultAddr));
    _utils_setupVaultProviders(IVault(bvaultAddr));

    address yvaultAddr = chief.deployVault(address(yVaultFactory), abi.encode(address(asset)), "A+");
    yvault = YieldVault(payable(yvaultAddr));
    _utils_setupVaultProviders(IVault(yvaultAddr));

    flasher = new MockFlasher();
    executionCall = abi.encodeWithSelector(chief.allowFlasher.selector, address(flasher), true);
    _callWithTimelock(address(chief), executionCall);

    rebalancer = new RebalancerManager(address(chief));
    executionCall =
      abi.encodeWithSelector(chief.grantRole.selector, REBALANCER_ROLE, address(rebalancer));
    _callWithTimelock(address(chief), executionCall);

    executionCall = abi.encodeWithSelector(rebalancer.allowExecutor.selector, address(this), true);
    _callWithTimelock(address(rebalancer), executionCall);

    _utils_doDepositAndBorrow(DEPOSIT_AMOUNT, BORROW_AMOUNT, IVault(bvaultAddr), alice);
    _utils_doDepositAndBorrow(DEPOSIT_AMOUNT, BORROW_AMOUNT, IVault(bvaultAddr), bob);
    _utils_doDepositAndBorrow(DEPOSIT_AMOUNT, BORROW_AMOUNT, IVault(bvaultAddr), charlie);
    _utils_doDepositAndBorrow(DEPOSIT_AMOUNT, BORROW_AMOUNT, IVault(bvaultAddr), david);

    _utils_doDeposit(DEPOSIT_AMOUNT, IVault(yvaultAddr), alice);
    _utils_doDeposit(DEPOSIT_AMOUNT, IVault(yvaultAddr), bob);
    _utils_doDeposit(DEPOSIT_AMOUNT, IVault(yvaultAddr), charlie);
    _utils_doDeposit(DEPOSIT_AMOUNT, IVault(yvaultAddr), david);
  }

  function _utils_setPrice(address asset1, address asset2, uint256 price) internal {
    vm.mockCall(
      address(oracle),
      abi.encodeWithSelector(MockOracle.getPriceOf.selector, asset1, asset2, 18),
      abi.encode(price)
    );
  }

  function _utils_setupOracle(address asset1, address asset2) internal {
    // WETH and DAI prices: 2000 DAI/WETH
    _utils_setPrice(asset1, asset2, TEST_ETH_PER_USD_PRICE);
    _utils_setPrice(asset2, asset1, TEST_USD_PER_ETH_PRICE);
  }

  function _utils_setupTestRoles() internal {
    // Grant this test address applicable roles.
    _grantRoleChief(REBALANCER_ROLE, address(this));
  }

  function _callWithTimelock(address target, bytes memory callData) internal {
    timelock.schedule(target, 0, callData, 0x00, 0x00, 1.5 days);
    vm.warp(block.timestamp + 2 days);
    timelock.execute(target, 0, callData, 0x00, 0x00);
    rewind(2 days);
  }

  function _grantRoleChief(bytes32 role, address account) internal {
    bytes memory sendData = abi.encodeWithSelector(chief.grantRole.selector, role, account);
    _callWithTimelock(address(chief), sendData);
  }

  function _utils_setupVaultProviders(IVault vault_) internal {
    ILendingProvider[] memory providers = new ILendingProvider[](2);
    providers[0] = mockProviderA;
    providers[1] = mockProviderB;
    bytes memory encodedWithSelectorData =
      abi.encodeWithSelector(vault_.setProviders.selector, providers);
    _callWithTimelock(address(vault_), encodedWithSelectorData);
    vault_.setActiveProvider(mockProviderA);
  }

  function dealMockERC20(MockERC20 mockerc20, address to, uint256 amount) internal {
    mockerc20.mint(to, amount);
  }

  function _utils_doDeposit(uint256 amount, IVault v, address who) internal {
    dealMockERC20(MockERC20(address(asset)), who, amount);
    vm.startPrank(who);
    SafeERC20.safeApprove(asset, address(v), amount);
    v.deposit(amount, who);
    vm.stopPrank();
  }

  function _utils_doDepositAndBorrow(
    uint256 depositAmount,
    uint256 borrowAmount,
    IVault v,
    address who
  )
    internal
  {
    _utils_doDeposit(depositAmount, v, who);
    vm.prank(who);
    v.borrow(borrowAmount, who, who);
  }

  function test_assertSetUp() public {
    assertEq(
      mockProviderA.getDepositBalance(address(bvault), IVault(address(bvault))), 4 * DEPOSIT_AMOUNT
    );
    assertEq(
      mockProviderA.getBorrowBalance(address(bvault), IVault(address(bvault))), 4 * BORROW_AMOUNT
    );
    assertEq(
      mockProviderA.getDepositBalance(address(yvault), IVault(address(yvault))), 4 * DEPOSIT_AMOUNT
    );

    assertEq(mockProviderB.getDepositBalance(address(bvault), IVault(address(bvault))), 0);
    assertEq(mockProviderB.getBorrowBalance(address(bvault), IVault(address(bvault))), 0);
    assertEq(mockProviderB.getDepositBalance(address(yvault), IVault(address(yvault))), 0);
  }

  function test_fullRebalancingBorrowingVault() public {
    uint256 assets = 4 * DEPOSIT_AMOUNT; // alice, bob, charlie, david
    uint256 debt = 4 * BORROW_AMOUNT; // alice, bob, charlie, david

    dealMockERC20(MockERC20(address(debtAsset)), address(this), debt);

    SafeERC20.safeApprove(debtAsset, address(bvault), debt);
    bvault.rebalance(assets, debt, mockProviderA, mockProviderB, 0);

    assertEq(mockProviderA.getDepositBalance(address(bvault), IVault(address(bvault))), 0);
    assertEq(mockProviderA.getBorrowBalance(address(bvault), IVault(address(bvault))), 0);

    assertEq(mockProviderB.getDepositBalance(address(bvault), IVault(address(bvault))), assets);
    assertEq(mockProviderB.getBorrowBalance(address(bvault), IVault(address(bvault))), debt);
  }

  function test_fullRebalancingYieldVault() public {
    uint256 assets = 4 * DEPOSIT_AMOUNT; // alice, bob, charlie, david

    yvault.rebalance(assets, 0, mockProviderA, mockProviderB, 0);

    assertEq(mockProviderA.getDepositBalance(address(yvault), IVault(address(yvault))), 0);
    assertEq(mockProviderB.getDepositBalance(address(yvault), IVault(address(yvault))), assets);
  }

  function test_partialRebalancingBorrowingVault() public {
    uint256 assets75 = 3 * DEPOSIT_AMOUNT; // alice, bob, charlie
    uint256 debt75 = 3 * BORROW_AMOUNT; // alice, bob, charlie
    uint256 assets25 = DEPOSIT_AMOUNT; // david
    uint256 debt25 = BORROW_AMOUNT; // david

    dealMockERC20(MockERC20(address(debtAsset)), address(this), debt75);

    SafeERC20.safeApprove(debtAsset, address(bvault), debt75);
    bvault.rebalance(assets75, debt75, mockProviderA, mockProviderB, 0);

    assertEq(mockProviderA.getDepositBalance(address(bvault), IVault(address(bvault))), assets25);
    assertEq(mockProviderA.getBorrowBalance(address(bvault), IVault(address(bvault))), debt25);

    assertEq(mockProviderB.getDepositBalance(address(bvault), IVault(address(bvault))), assets75);
    assertEq(mockProviderB.getBorrowBalance(address(bvault), IVault(address(bvault))), debt75);
  }

  //TODO add more test cases with RebalancerManager contract.
  function test_rebalanceBorrowingVaultWithRebalancer() public {
    uint256 assets = 4 * DEPOSIT_AMOUNT; // alice, bob, charlie, david
    uint256 debt = 4 * BORROW_AMOUNT; // alice, bob, charlie, david

    rebalancer.rebalanceVault(bvault, assets, debt, mockProviderA, mockProviderB, flasher, true);

    assertEq(mockProviderA.getDepositBalance(address(bvault), IVault(address(bvault))), 0);
    assertEq(mockProviderA.getBorrowBalance(address(bvault), IVault(address(bvault))), 0);

    assertEq(mockProviderB.getDepositBalance(address(bvault), IVault(address(bvault))), assets);
    assertEq(mockProviderB.getBorrowBalance(address(bvault), IVault(address(bvault))), debt);
  }

  function test_rebalanceYieldVaultWithRebalancer() public {
    uint256 assets = 4 * DEPOSIT_AMOUNT; // alice, bob, charlie, david

    rebalancer.rebalanceVault(yvault, assets, 0, mockProviderA, mockProviderB, flasher, true);

    assertEq(mockProviderA.getDepositBalance(address(yvault), IVault(address(yvault))), 0);
    assertEq(mockProviderB.getDepositBalance(address(yvault), IVault(address(yvault))), assets);
  }

  //MALICIOUS TESTS

  function test_rebalanceYieldVaultWithRebalancerAndInvalidDebt(uint256 debt) public {
    uint256 assets = 4 * DEPOSIT_AMOUNT; // alice, bob, charlie, david

    //debt !=0
    rebalancer.rebalanceVault(yvault, assets, debt, mockProviderA, mockProviderB, flasher, true);

    assertEq(mockProviderA.getDepositBalance(address(yvault), IVault(address(yvault))), 0);
    assertEq(mockProviderB.getDepositBalance(address(yvault), IVault(address(yvault))), assets);
  }

  function test_rebalanceYieldVaultWithRebalancerAndInvalidProvider() public {
    uint256 assets = 4 * DEPOSIT_AMOUNT; // alice, bob, charlie, david

    //fake provider to steal funds
    ILendingProvider thiefProvider = new ThiefProvider();

    //rebalance with fake provider should fail
    vm.expectRevert(YieldVault.YieldVault__rebalance_invalidProvider.selector);
    rebalancer.rebalanceVault(yvault, assets, 0, mockProviderA, thiefProvider, flasher, true);
  }

  //TEST FOR ERRORS
  // error RebalancerManager__rebalanceVault_notValidFlasher();
  function test_notValidFlasher() public {
    uint256 assets = 4 * DEPOSIT_AMOUNT; // alice, bob, charlie, david
    MockFlasher invalidFlasher = new MockFlasher();

    //rebalance with invalid flasher should fail
    vm.expectRevert(RebalancerManager.RebalancerManager__rebalanceVault_notValidFlasher.selector);
    rebalancer.rebalanceVault(bvault, assets, 0, mockProviderA, mockProviderB, invalidFlasher, true);
  }

  // error RebalancerManager__checkAssetsAmount_invalidAmount();
  function test_checkAssetsAmountInvalidAmount(uint256 invalidAmount) public {
    uint256 assets = 4 * DEPOSIT_AMOUNT; // alice, bob, charlie, david
    vm.assume(invalidAmount > assets);

    //rebalance with more amount than available should revert
    vm.expectRevert(RebalancerManager.RebalancerManager__checkAssetsAmount_invalidAmount.selector);

    rebalancer.rebalanceVault(yvault, invalidAmount, 0, mockProviderA, mockProviderB, flasher, true);
  }

  // error RebalancerManager__checkDebtAmount_invalidAmount();
  function test_checkDebtAmountInvalidAmount(uint256 invalidAmount) public {
    uint256 assets = 4 * DEPOSIT_AMOUNT; // alice, bob, charlie, david
    uint256 debt = 4 * BORROW_AMOUNT;
    vm.assume(invalidAmount > debt); //alice, bob, charlie, david

    //rebalance with more amount than available should revert
    vm.expectRevert(RebalancerManager.RebalancerManager__checkDebtAmount_invalidAmount.selector);

    rebalancer.rebalanceVault(
      bvault, assets, invalidAmount, mockProviderA, mockProviderB, flasher, true
    );
  }

  // error RebalancerManager__getFlashloan_flashloanFailed();
  function test_flashLoanFailed() public {
    uint256 assets = 4 * DEPOSIT_AMOUNT;
    uint256 debt = 4 * BORROW_AMOUNT;

    //flasher that doesnt give all the amount requested
    IFlasher greedyFlasher = new GreedyFlasher();

    bytes memory executionCall =
      abi.encodeWithSelector(chief.allowFlasher.selector, address(greedyFlasher), true);
    _callWithTimelock(address(chief), executionCall);

    vm.expectRevert(RebalancerManager.RebalancerManager__getFlashloan_flashloanFailed.selector);
    rebalancer.rebalanceVault(
      bvault, assets, debt, mockProviderA, mockProviderB, greedyFlasher, true
    );
  }

  // error RebalancerManager__getFlashloan_notEmptyEntryPoint();
  function test_notEmptyEntryPoint() public {
    uint256 assets = 4 * DEPOSIT_AMOUNT;
    uint256 debt = 4 * BORROW_AMOUNT;

    // IFlasher reentrantHelper = new ReentrantFlasherHelper();
    IFlasher reentrant =
      new ReentrantFlasher(rebalancer, bvault, assets, debt,flasher, mockProviderA, mockProviderB);

    bytes memory executionCall =
      abi.encodeWithSelector(chief.allowFlasher.selector, address(reentrant), true);
    _callWithTimelock(address(chief), executionCall);

    executionCall =
      abi.encodeWithSelector(rebalancer.allowExecutor.selector, address(reentrant), true);
    _callWithTimelock(address(rebalancer), executionCall);

    vm.expectRevert(RebalancerManager.RebalancerManager__getFlashloan_notEmptyEntryPoint.selector);
    rebalancer.rebalanceVault(bvault, assets, debt, mockProviderA, mockProviderB, reentrant, true);
  }

  // error RebalancerManager__completeRebalance_invalidEntryPoint();
  function test_invalidEntryPoint() public {
    uint256 assets = 4 * DEPOSIT_AMOUNT;
    uint256 debt = 4 * BORROW_AMOUNT;

    IFlasher maliciousFlasher = new MaliciousFlasher();

    bytes memory executionCall =
      abi.encodeWithSelector(chief.allowFlasher.selector, address(maliciousFlasher), true);
    _callWithTimelock(address(chief), executionCall);

    vm.expectRevert(
      RebalancerManager.RebalancerManager__completeRebalance_invalidEntryPoint.selector
    );
    rebalancer.rebalanceVault(
      bvault, assets, debt, mockProviderA, mockProviderB, maliciousFlasher, true
    );
  }

  // error RebalancerManager__allowExecutor_noAllowChange();
  function testFail_noAllowChange() public {
    //The TimelockController scheules calls to be made.
    //When we try to allow the same executor twice, the calls reverts in the TimelockController because the call has already been scheduled
    bytes memory executionCall =
      abi.encodeWithSelector(chief.allowFlasher.selector, address(flasher), true);
    _callWithTimelock(address(chief), executionCall);
  }

  // error RebalancerManager__zeroAddress();
  function testFail_zeroAddress() public {
    //The error returned is not the one from RebalancerManager. TimelockController has a verification to see if the underlying call failed,
    //thats the one being returned
    bytes memory executionCall =
      abi.encodeWithSelector(chief.allowFlasher.selector, address(0), true);
    _callWithTimelock(address(chief), executionCall);
  }
}
