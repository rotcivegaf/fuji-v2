// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.15;

import {IERC20} from "openzeppelin-contracts/contracts/token/ERC20/IERC20.sol";
import {SafeERC20} from "openzeppelin-contracts/contracts/token/ERC20/utils/SafeERC20.sol";
import {Setup} from "./utils/Setup.sol";
import {IVault} from "../src/interfaces/IVault.sol";

contract VaultTestsSuite is Setup {
  function test_depositAndWithdraw() public {
    vm.label(address(alice), "alice");

    uint256 amount = 2 ether;
    deal(collateralAsset, alice, amount);

    vm.startPrank(alice);

    SafeERC20.safeApprove(IERC20(collateralAsset), address(vault), amount);
    vault.deposit(amount, alice);

    assertEq(vault.balanceOf(alice), amount);
    vault.withdraw(amount, alice, alice);
    assertEq(vault.balanceOf(alice), 0);
    assertEq(IERC20(collateralAsset).balanceOf(alice), amount);
  }
}
