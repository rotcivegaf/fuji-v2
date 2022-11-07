// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity 0.8.15;

/**
 * @title FlasherAaveV3
 * @author Fujidao Labs
 * @notice Handles logic of AaveV3 as a flashloan provider.
 */

import {BaseFlasher} from "../abstracts/BaseFlasher.sol";
import {IV3Pool} from "../interfaces/aaveV3/IV3Pool.sol";
import {IFlashLoanSimpleReceiver} from "../interfaces/aaveV3/IFlashLoanSimpleReceiver.sol";

contract FlasherAaveV3 is BaseFlasher, IFlashLoanSimpleReceiver {
  // aaveV3Pool Goerli = 0x368EedF3f56ad10b9bC57eed4Dac65B26Bb667f6
  constructor(address aaveV3Pool) BaseFlasher("FlasherAaveV3", aaveV3Pool) {}

  /// @inheritdoc BaseFlasher
  function initiateFlashloan(
    address asset,
    uint256 amount,
    address requestor,
    bytes memory requestorCalldata
  )
    external
    override
  {
    bytes memory data = abi.encode(asset, amount, requestor, requestorCalldata);
    _checkAndSetEntryPoint(data);

    address receiverAddress = address(this);

    IV3Pool(getFlashloanSourceAddr(asset)).flashLoanSimple(receiverAddress, asset, amount, data, 0);
  }

  function computeFlashloanFee(address, uint256) external view override returns (uint256 fee) {
    // TODO proper implementation of this method
  }

  /**
   * @dev Callback enforced by AaveV3 Flashloan
   */
  function executeOperation(
    address asset,
    uint256 amount,
    uint256 premium,
    address initiator,
    bytes calldata data
  )
    external
    override
    returns (bool success)
  {
    (address asset_, uint256 amount_, address requestor_, bytes memory requestorCalldata_) =
      _checkReentryPoint(data);

    if (
      asset != asset_ || amount != amount_ || msg.sender != getFlashloanSourceAddr(asset)
        || initiator != address(this)
    ) {
      revert BaseFlasher__notAuthorized();
    }

    _requestorExecution(asset, amount, premium, requestor_, requestorCalldata_);

    success = true;
  }
}
