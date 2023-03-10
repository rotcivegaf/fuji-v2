// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity 0.8.15;

/**
 * @title IFlashLoanSimpleReceiver
 *
 * @author Aave
 *
 * @notice Defines the basic interface of a
 * flashloan-receiver contract.
 *
 * @dev Implement this interface to develop a
 * flashloan-compatible flashLoanReceiver contract
 */
interface IFlashLoanSimpleReceiver {
  /**
   * @notice Executes an operation after receiving the flash-borrowed asset
   *
   * @param asset The address of the flash-borrowed asset
   * @param amount The amount of the flash-borrowed asset
   * @param premium The fee of the flash-borrowed asset
   * @param initiator The address of the flashloan initiator
   * @param params The byte-encoded params passed when initiating the flashloan
   *
   * @dev Ensure that the contract can return the debt + premium, e.g., has
   * enough funds to repay and has approved the Pool to pull the total amount
   */
  function executeOperation(
    address asset,
    uint256 amount,
    uint256 premium,
    address initiator,
    bytes calldata params
  )
    external
    returns (bool);
}
