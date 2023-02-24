// SPDX-License-Identifier: BUSL-1.1
pragma solidity 0.8.15;

/**
 * @title VaultDeployer
 *
 * @author Fujidao Labs
 *
 * @notice Abstract contract to be inherited by vault deployers
 * for whitelisted template factories.
 * This contract provides methods that facilitate information for
 * front-end applications.
 */

import {IChief} from "../interfaces/IChief.sol";

abstract contract VaultDeployer {
  /// @dev Custom Errors
  error VaultDeployer__onlyChief_notAuthorized();
  error VaultDeployer__onlyTimelock_notAuthorized();
  error VaultDeployer__zeroAddress();

  /**
   * @dev Emit when a vault is registered.
   *
   * @param vault address
   * @param asset address
   * @param salt used for address generation
   */
  event VaultRegistered(address vault, address asset, bytes32 salt);

  address public immutable chief;

  modifier onlyChief() {
    if (msg.sender != chief) {
      revert VaultDeployer__onlyChief_notAuthorized();
    }
    _;
  }

  modifier onlyTimelock() {
    if (msg.sender != IChief(chief).timelock()) {
      revert VaultDeployer__onlyTimelock_notAuthorized();
    }
    _;
  }

  /**
   * @notice Abstract constructor of a new {VaultDeployer}.
   *
   * @param chief_ address
   *
   * @dev Requirements:
   * - Must pass non-zero {Chief} address, that could be checked at child contract.
   */
  constructor(address chief_) {
    if (chief_ == address(0)) {
      revert VaultDeployer__zeroAddress();
    }
    chief = chief_;
  }
}
