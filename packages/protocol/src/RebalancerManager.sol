// SPDX-License-Identifier: BUSL-1.1
pragma solidity 0.8.15;

/**
 * @title RebalancerManager.
 * @author fujidao Labs
 * @notice  Contract that triggers rebalancing of the FujiV2 vaults.
 */

import {IVault} from "./interfaces/IVault.sol";
import {IFlasher} from "./interfaces/IFlasher.sol";
import {IRouter} from "./interfaces/IRouter.sol"; // TODO remove when proper operating methods in Flasher contract is defined.
import {ILendingProvider} from "./interfaces/ILendingProvider.sol";
import {SystemAccessControl} from "./access/SystemAccessControl.sol";
import {IERC20} from "openzeppelin-contracts/contracts/token/ERC20/IERC20.sol";
import {SafeERC20} from "openzeppelin-contracts/contracts/token/ERC20/utils/SafeERC20.sol";

contract RebalancerManager is SystemAccessControl {
  using SafeERC20 for IERC20;

  // custom errors
  error RebalancerManager__checkValidProviders_invalidProvider();
  error RebalancerManager__checkAssetsAmount_invalidAmount();
  error RebalancerManager__checkDebtAmount_invalidAmount();
  error RebalancerManager__getFlashloan_flashloanFailed();

  constructor(address chief_) SystemAccessControl(chief_) {}

  /**
   * @notice Triggers a flashloan
   *
   * Requirements:
   * - MUST check `from` and `to` are valid providers of `vault`.
   * - MUST check `assets` and `debt` amounts are less than vaults managed amounts.
   */
  function rebalanceBorrowingVault(
    IVault vault,
    uint256 assets,
    uint256 debt,
    address from,
    address to,
    IFlasher flasher,
    bool setToAsActiveProvider
  )
    external
    hasRole(msg.sender, REBALANCER_ROLE)
    returns (bool success)
  {
    _checkValidProviders(vault, from, to);
    _checkAssetsAmount(vault, assets, from);
    _checkDebtAmount(vault, debt, from);

    IERC20 debtAsset = IERC20(vault.debtAsset());

    _getFlashloan(flasher, address(debtAsset), debt);

    debtAsset.safeApprove(address(vault), debt);

    bytes memory rebalanceParams =
      abi.encode(assets, debt, flasher.computeFlashloanFee(debt), from, to);

    vault.rebalance(rebalanceParams);

    debtAsset.safeTransfer(address(flasher), debt + flasher.computeFlashloanFee(debt));

    if (setToAsActiveProvider) {
      vault.setActiveProvider(ILendingProvider(to));
    }

    success = true;
  }

  function rebalanceYieldVault(
    IVault vault,
    uint256 assets,
    address from,
    address to,
    bool setToAsActiveProvider
  )
    external
    hasRole(msg.sender, REBALANCER_ROLE)
    returns (bool success)
  {
    _checkValidProviders(vault, from, to);
    _checkAssetsAmount(vault, assets, from);

    bytes memory rebalanceParams = abi.encode(assets, from, to);

    vault.rebalance(rebalanceParams);

    if (setToAsActiveProvider) {
      vault.setActiveProvider(ILendingProvider(to));
    }

    success = true;
  }

  function _checkValidProviders(IVault vault, address from, address to) internal view {
    bool isFromValid;
    bool isToValid;
    ILendingProvider[] memory lproviders = vault.getProviders();
    uint256 length = lproviders.length;
    for (uint256 i = 0; i < length;) {
      if (from == address(lproviders[i])) {
        isFromValid == true;
      }
      if (to == address(lproviders[i])) {
        isToValid == true;
      }
      unchecked {
        ++i;
      }
    }
    if (!isFromValid && !isToValid) {
      revert RebalancerManager__checkValidProviders_invalidProvider();
    }
  }

  function _checkAssetsAmount(IVault vault, uint256 amount, address from) internal view {
    uint256 assetsAtProvider = ILendingProvider(from).getDepositBalance(address(vault), vault);
    if (amount > assetsAtProvider) {
      revert RebalancerManager__checkAssetsAmount_invalidAmount();
    }
  }

  function _checkDebtAmount(IVault vault, uint256 amount, address from) internal view {
    uint256 debtAtProvider = ILendingProvider(from).getBorrowBalance(address(vault), vault);
    if (amount > debtAtProvider) {
      revert RebalancerManager__checkDebtAmount_invalidAmount();
    }
  }

  function _getFlashloan(IFlasher flasher, address asset, uint256 amount) internal {
    // TODO define proper operating methods in Flasher contracts.
    IRouter.Action[] memory actions = new IRouter.Action[](1);
    // TODO define proper operating methods in Flasher contracts.
    bytes[] memory args = new bytes[](1);

    IFlasher.FlashloanParams memory flParams = IFlasher.FlashloanParams(
      asset,
      amount,
      address(0), // TODO define proper operating methods in Flasher contracts.
      actions, // TODO define proper operating methods in Flasher contracts.
      args // TODO define proper operating methods in Flasher contracts.
    );

    flasher.initiateFlashloan(flParams);

    if (IERC20(asset).balanceOf(address(this)) != amount) {
      revert RebalancerManager__getFlashloan_flashloanFailed();
    }
  }
}
