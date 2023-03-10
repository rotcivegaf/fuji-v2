/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import type { Provider } from "@ethersproject/providers";
import { Contract, Signer, utils } from "ethers";
import type {
  IWETH,
  IWETHInterface,
  IWETHMulticall,
} from "../../../src/interfaces/IWETH";
import { Contract as MulticallContract } from "@hovoh/ethcall";
const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "deposit",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];
export class IWETH__factory {
  static readonly abi = _abi;
  static createInterface(): IWETHInterface {
    return new utils.Interface(_abi) as IWETHInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): IWETH {
    return new Contract(address, _abi, signerOrProvider) as IWETH;
  }
  static multicall(address: string): IWETHMulticall {
    return new MulticallContract(address, _abi) as unknown as IWETHMulticall;
  }
}
