/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import type { Provider } from "@ethersproject/providers";
import { Contract, Signer, utils } from "ethers";
import type {
  LibActionBundler,
  LibActionBundlerInterface,
  LibActionBundlerMulticall,
} from "../../../src/libraries/LibActionBundler";
import { Contract as MulticallContract } from "@hovoh/ethcall";
const _abi = [
  {
    inputs: [
      {
        internalType: "contract IVault",
        name: "vault",
        type: "IVault",
      },
      {
        internalType: "address",
        name: "router",
        type: "address",
      },
      {
        internalType: "address",
        name: "swapper",
        type: "address",
      },
      {
        internalType: "address",
        name: "flasher",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "withdrawAmount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "flashAmount",
        type: "uint256",
      },
    ],
    name: "closeWithFlashloan",
    outputs: [
      {
        internalType: "enum IRouter.Action[]",
        name: "",
        type: "IRouter.Action[]",
      },
      {
        internalType: "bytes[]",
        name: "",
        type: "bytes[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "vault",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "borrowAmount",
        type: "uint256",
      },
    ],
    name: "depositAndBorrow",
    outputs: [
      {
        internalType: "enum IRouter.Action[]",
        name: "",
        type: "IRouter.Action[]",
      },
      {
        internalType: "bytes[]",
        name: "",
        type: "bytes[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
export class LibActionBundler__factory {
  static readonly abi = _abi;
  static createInterface(): LibActionBundlerInterface {
    return new utils.Interface(_abi) as LibActionBundlerInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): LibActionBundler {
    return new Contract(address, _abi, signerOrProvider) as LibActionBundler;
  }
  static multicall(address: string): LibActionBundlerMulticall {
    return new MulticallContract(
      address,
      _abi
    ) as unknown as LibActionBundlerMulticall;
  }
}
