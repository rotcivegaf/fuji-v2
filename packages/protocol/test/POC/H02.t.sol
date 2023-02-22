// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.15;

import {IERC20} from "openzeppelin-contracts/contracts/token/ERC20/IERC20.sol";
import {SafeERC20} from "openzeppelin-contracts/contracts/token/ERC20/utils/SafeERC20.sol";
import {SimpleRouter} from "../../src/routers/SimpleRouter.sol";
import {IWETH9} from "../../src/abstracts/WETH9.sol";
import {IVault} from "../../src/interfaces/IVault.sol";
import {IRouter} from "../../src/interfaces/IRouter.sol";
import {LibSigUtils} from "../../src/libraries/LibSigUtils.sol";
import {MockingSetup} from "../mocking/MockingSetup.sol";

contract H02 is MockingSetup {
  IRouter public simpleRouter;

  uint256 amount = 2 ether;

  function setUp() public {
    simpleRouter = new SimpleRouter(IWETH9(collateralAsset), chief);
  }

  function _depositAndBorrow(uint256 deposit, uint256 debt, IVault vault_) internal {
    IRouter.Action[] memory actions = new IRouter.Action[](3);
    bytes[] memory args = new bytes[](3);

    LibSigUtils.Permit memory permit =
      LibSigUtils.buildPermitStruct(ALICE, address(simpleRouter), ALICE, debt, 0, address(vault));

    (uint256 deadline, uint8 v, bytes32 r, bytes32 s) =
      _getPermitBorrowArgs(permit, ALICE_PK, address(vault_));

    actions[0] = IRouter.Action.Deposit;
    actions[1] = IRouter.Action.PermitBorrow;
    actions[2] = IRouter.Action.Borrow;

    args[0] = abi.encode(address(vault_), deposit, ALICE, ALICE);
    args[1] = abi.encode(address(vault_), ALICE, ALICE, debt, deadline, v, r, s);
    args[2] = abi.encode(address(vault_), debt, ALICE, ALICE);

    _dealMockERC20(vault_.asset(), ALICE, deposit);

    vm.startPrank(ALICE);
    SafeERC20.safeApprove(IERC20(vault_.asset()), address(simpleRouter), deposit);

    simpleRouter.xBundle(actions, args);
    vm.stopPrank();
  }

  function test_tryDepositOnBehalf() public {
    IRouter.Action[] memory actions = new IRouter.Action[](1);
    actions[0] = IRouter.Action.Deposit;

    bytes[] memory args = new bytes[](1);
    args[0] = abi.encode(address(vault), amount, ALICE, ALICE);

    _dealMockERC20(collateralAsset, ALICE, amount * 2);

    vm.startPrank(ALICE);
    SafeERC20.safeApprove(IERC20(collateralAsset), address(simpleRouter), type(uint256).max);

    simpleRouter.xBundle(actions, args);
    vm.stopPrank();

    vm.expectRevert("ERC20: transfer amount exceeds balance");
    vm.prank(address(1));
    simpleRouter.xBundle(actions, args);
    vm.stopPrank();

    assertEq(IERC20(collateralAsset).balanceOf(ALICE), amount);
    assertEq(vault.balanceOf(ALICE), amount);
  }

  function test_tryPaybackOnBehalf() public {
    _depositAndBorrow(amount * 2, amount * 2, vault);

    IRouter.Action[] memory actions = new IRouter.Action[](1);
    actions[0] = IRouter.Action.Payback;

    bytes[] memory args = new bytes[](1);
    args[0] = abi.encode(address(vault), amount, ALICE, ALICE);

    _dealMockERC20(debtAsset, ALICE, amount * 2);

    vm.startPrank(ALICE);

    SafeERC20.safeApprove(IERC20(debtAsset), address(simpleRouter), type(uint256).max);

    simpleRouter.xBundle(actions, args);
    vm.stopPrank();

    vm.expectRevert("ERC20: transfer amount exceeds balance");
    vm.prank(address(1));
    simpleRouter.xBundle(actions, args);
    vm.stopPrank();

    assertEq(IERC20(debtAsset).balanceOf(ALICE), amount * 3);
    assertEq(vault.balanceOf(ALICE), amount * 2);
    assertEq(vault.balanceOfDebt(ALICE), amount);
  }
}
