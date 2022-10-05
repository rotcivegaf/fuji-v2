/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import type { Provider } from "@ethersproject/providers";
import { Contract, Signer, utils } from "ethers";
import type {
  QueueManager,
  QueueManagerInterface,
  QueueManagerMulticall,
} from "../../../../../../../../../../lib/nxtp/packages/deployments/contracts/contracts/nomad-core/contracts/Queue.sol/QueueManager";
import { Contract as MulticallContract } from "@hovoh/ethcall";
const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint8",
        name: "version",
        type: "uint8",
      },
    ],
    name: "Initialized",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "_item",
        type: "bytes32",
      },
    ],
    name: "queueContains",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "queueEnd",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "queueLength",
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
];
export class QueueManager__factory {
  static readonly abi = _abi;
  static createInterface(): QueueManagerInterface {
    return new utils.Interface(_abi) as QueueManagerInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): QueueManager {
    return new Contract(address, _abi, signerOrProvider) as QueueManager;
  }
  static multicall(address: string): QueueManagerMulticall {
    return new MulticallContract(
      address,
      _abi
    ) as unknown as QueueManagerMulticall;
  }
}
