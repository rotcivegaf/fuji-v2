/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import type { Provider } from "@ethersproject/providers";
import { Contract, Signer, utils } from "ethers";
import type {
  PeripheryPayments,
  PeripheryPaymentsInterface,
  PeripheryPaymentsMulticall,
} from "../../../../src/helpers/PeripheryPayments.sol/PeripheryPayments";
import { Contract as MulticallContract } from "@hovoh/ethcall";
const _abi = [
  {
    inputs: [],
    name: "WETH9",
    outputs: [
      {
        internalType: "contract IWETH9",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract ERC20",
        name: "token",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract ERC20",
        name: "token",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "recipient",
        type: "address",
      },
    ],
    name: "pullToken",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract ERC20",
        name: "token",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "pullTokenFrom",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "refundETH",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract ERC20",
        name: "token",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amountMinimum",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "recipient",
        type: "address",
      },
    ],
    name: "sweepToken",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amountMinimum",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "recipient",
        type: "address",
      },
    ],
    name: "unwrapWETH9",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "wrapWETH9",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    stateMutability: "payable",
    type: "receive",
  },
];
export class PeripheryPayments__factory {
  static readonly abi = _abi;
  static createInterface(): PeripheryPaymentsInterface {
    return new utils.Interface(_abi) as PeripheryPaymentsInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): PeripheryPayments {
    return new Contract(address, _abi, signerOrProvider) as PeripheryPayments;
  }
  static multicall(address: string): PeripheryPaymentsMulticall {
    return new MulticallContract(
      address,
      _abi
    ) as unknown as PeripheryPaymentsMulticall;
  }
}