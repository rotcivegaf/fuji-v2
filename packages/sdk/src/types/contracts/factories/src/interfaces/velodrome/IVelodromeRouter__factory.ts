/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import type { Provider } from "@ethersproject/providers";
import { Contract, Signer, utils } from "ethers";
import type {
  IVelodromeRouter,
  IVelodromeRouterInterface,
  IVelodromeRouterMulticall,
} from "../../../../src/interfaces/velodrome/IVelodromeRouter";
import { Contract as MulticallContract } from "@hovoh/ethcall";
const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "tokenA",
        type: "address",
      },
      {
        internalType: "address",
        name: "tokenB",
        type: "address",
      },
      {
        internalType: "bool",
        name: "stable",
        type: "bool",
      },
      {
        internalType: "uint256",
        name: "liquidity",
        type: "uint256",
      },
    ],
    name: "quoteRemoveLiquidity",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amountIn",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amountOutMin",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "tokenFrom",
        type: "address",
      },
      {
        internalType: "address",
        name: "tokenTo",
        type: "address",
      },
      {
        internalType: "bool",
        name: "stable",
        type: "bool",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "deadline",
        type: "uint256",
      },
    ],
    name: "swapExactTokensForTokensSimple",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];
export class IVelodromeRouter__factory {
  static readonly abi = _abi;
  static createInterface(): IVelodromeRouterInterface {
    return new utils.Interface(_abi) as IVelodromeRouterInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IVelodromeRouter {
    return new Contract(address, _abi, signerOrProvider) as IVelodromeRouter;
  }
  static multicall(address: string): IVelodromeRouterMulticall {
    return new MulticallContract(
      address,
      _abi
    ) as unknown as IVelodromeRouterMulticall;
  }
}
