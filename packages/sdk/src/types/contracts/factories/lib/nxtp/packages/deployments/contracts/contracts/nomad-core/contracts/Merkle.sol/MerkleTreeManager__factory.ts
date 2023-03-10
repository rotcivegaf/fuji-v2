/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import type { Provider } from "@ethersproject/providers";
import { Contract, Signer, utils } from "ethers";
import type {
  MerkleTreeManager,
  MerkleTreeManagerInterface,
  MerkleTreeManagerMulticall,
} from "../../../../../../../../../../lib/nxtp/packages/deployments/contracts/contracts/nomad-core/contracts/Merkle.sol/MerkleTreeManager";
import { Contract as MulticallContract } from "@hovoh/ethcall";
const _abi = [
  {
    inputs: [],
    name: "count",
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
    inputs: [],
    name: "root",
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
    name: "tree",
    outputs: [
      {
        internalType: "uint256",
        name: "count",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
export class MerkleTreeManager__factory {
  static readonly abi = _abi;
  static createInterface(): MerkleTreeManagerInterface {
    return new utils.Interface(_abi) as MerkleTreeManagerInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): MerkleTreeManager {
    return new Contract(address, _abi, signerOrProvider) as MerkleTreeManager;
  }
  static multicall(address: string): MerkleTreeManagerMulticall {
    return new MulticallContract(
      address,
      _abi
    ) as unknown as MerkleTreeManagerMulticall;
  }
}
