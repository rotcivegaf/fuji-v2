// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.15;


import "forge-std/Test.sol";
import "forge-std/console.sol";
import {FlasherEuler} from "../../src/flashloans/FlasherEuler.sol";
import {ERC20} from "openzeppelin-contracts/contracts/token/ERC20/ERC20.sol";

contract ERC20NoRevertOnTransfer is ERC20 {
  bool private _bool;

  constructor() ERC20("", "") {}

  function transfer(address, uint256) public virtual override returns (bool) {
    if (_bool) {
      // return false in second transfer
      return false;
    } else {
      _bool = true;
      return true;
    }
  }

  function flashLoan(uint256, bytes calldata data) external {
    FlasherEuler(msg.sender).onFlashLoan(data);
  }

  function underlyingToDToken(address) external view returns (address) {
    return address(this);
  }

  fallback() external {}
}

contract FlasherEulerOnFlashLoanTest is Test {
  FlasherEuler public flasher;
  ERC20NoRevertOnTransfer public testToken;

  function setUp() public {
    testToken = new ERC20NoRevertOnTransfer();
    flasher = new FlasherEuler(address(testToken), address(testToken));
  }

  function test_tryInitiateFlashloanAndTokenReturnFalse() public {
    vm.expectRevert("SafeERC20: ERC20 operation did not succeed");
    flasher.initiateFlashloan(
      address(testToken),
      1,
      address(testToken),
      abi.encode(address(testToken), 1, address(testToken), "")
    );
  }
}