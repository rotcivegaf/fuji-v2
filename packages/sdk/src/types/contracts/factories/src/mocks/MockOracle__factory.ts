/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import type { Provider } from "@ethersproject/providers";
import { Contract, Signer, utils } from "ethers";
import type {
  MockOracle,
  MockOracleInterface,
  MockOracleMulticall,
} from "../../../src/mocks/MockOracle";
import { Contract as MulticallContract } from "@hovoh/ethcall";
const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "asset",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "newPriceFeedAddress",
        type: "address",
      },
    ],
    name: "AssetPriceFeedChanged",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "currencyAsset",
        type: "address",
      },
      {
        internalType: "address",
        name: "commodityAsset",
        type: "address",
      },
      {
        internalType: "uint8",
        name: "decimals",
        type: "uint8",
      },
    ],
    name: "getPriceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "prices",
    outputs: [
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
        internalType: "address",
        name: "asset",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
    ],
    name: "setUSDPriceOf",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];
export class MockOracle__factory {
  static readonly abi = _abi;
  static createInterface(): MockOracleInterface {
    return new utils.Interface(_abi) as MockOracleInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): MockOracle {
    return new Contract(address, _abi, signerOrProvider) as MockOracle;
  }
  static multicall(address: string): MockOracleMulticall {
    return new MulticallContract(
      address,
      _abi
    ) as unknown as MockOracleMulticall;
  }
}
