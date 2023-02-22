// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.15;

import {MockingSetup} from "../mocking/MockingSetup.sol";
import {ILendingProvider} from "../../src/interfaces/ILendingProvider.sol";
import {BorrowingVaultFactory} from "../../src/vaults/borrowing/BorrowingVaultFactory.sol";
import {YieldVaultFactory} from "../../src/vaults/yield/YieldVaultFactory.sol";
import {IPausableVault} from "../../src/interfaces/IPausableVault.sol";


contract M03 is MockingSetup {
  error OUT_OF_GAS(uint256 i);

  BorrowingVaultFactory public bVaultFactory;
  YieldVaultFactory public yVaultFactory;
  ILendingProvider[] public providers;
  bytes public callData;
  uint256 public constant BLOCK_GAS_LIMIT = 500000;

  function setUp() public {
    yVaultFactory = new YieldVaultFactory(address(chief));
    providers.push(mockProvider);

    _grantRoleChief(PAUSER_ROLE, CHARLIE);
    _grantRoleChief(UNPAUSER_ROLE, CHARLIE);

    bVaultFactory = new BorrowingVaultFactory(address(chief));

    _callWithTimelock(
      address(chief),
      abi.encodeWithSelector(chief.allowVaultFactory.selector, address(bVaultFactory), true)
    );

    _callWithTimelock(
      address(bVaultFactory),
      abi.encodeWithSelector(bVaultFactory.setContractCode.selector, vm.getCode("BorrowingVault.sol:BorrowingVault"))
    );

    _callWithTimelock(
      address(chief),
      abi.encodeWithSelector(chief.allowVaultFactory.selector, address(yVaultFactory), true)
    );

    callData = abi.encode(address(collateralAsset), address(debtAsset), address(oracle), providers);
  }

  function test_pauseForceAllVaultsOutOfGas() public {
    for (uint256 i; i < 1000; ++i) {
      chief.deployVault(
        address(bVaultFactory),
        callData,
        95
      );

      uint256 prevGasleft = gasleft();
      vm.prank(CHARLIE);
      chief.pauseForceAllVaults();

      uint256 gasConsume = prevGasleft - gasleft();
      if (gasConsume > BLOCK_GAS_LIMIT) {
        revert OUT_OF_GAS(i);
      }
    }
  }

  function test_unpauseForceAllVaultsOutOfGas() public {
    for (uint256 i; i < 1000; ++i) {
      chief.deployVault(
        address(bVaultFactory),
        callData,
        95
      );

      uint256 prevGasleft = gasleft();
      vm.prank(CHARLIE);
      chief.unpauseForceAllVaults();

      uint256 gasConsume = prevGasleft - gasleft();
      if (gasConsume > BLOCK_GAS_LIMIT) {
        revert OUT_OF_GAS(i);
      }
    }
  }

  function test_pauseActionInAllVaultsOutOfGas() public {
    for (uint256 i; i < 1000; ++i) {
      chief.deployVault(
        address(bVaultFactory),
        callData,
        95
      );

      uint256 prevGasleft = gasleft();
      vm.prank(CHARLIE);
      chief.pauseActionInAllVaults(IPausableVault.VaultActions.Deposit);

      uint256 gasConsume = prevGasleft - gasleft();
      if (gasConsume > BLOCK_GAS_LIMIT) {
        revert OUT_OF_GAS(i);
      }

      vm.prank(CHARLIE);
      chief.upauseActionInAllVaults(IPausableVault.VaultActions.Deposit);
    }
  }

  function test_upauseActionInAllVaultsOutOfGas() public {
    for (uint256 i; i < 1000; ++i) {
      chief.deployVault(
        address(bVaultFactory),
        callData,
        95
      );
      vm.prank(CHARLIE);
      chief.pauseActionInAllVaults(IPausableVault.VaultActions.Deposit);

      uint256 prevGasleft = gasleft();
      vm.prank(CHARLIE);
      chief.upauseActionInAllVaults(IPausableVault.VaultActions.Deposit);

      uint256 gasConsume = prevGasleft - gasleft();
      if (gasConsume > BLOCK_GAS_LIMIT) {
        revert OUT_OF_GAS(i);
      }
    }
  }
}