/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import type { Provider } from "@ethersproject/providers";
import { Contract, Signer, utils } from "ethers";
import type {
  IUpdaterManager,
  IUpdaterManagerInterface,
  IUpdaterManagerMulticall,
} from "../../../../../../../../../lib/nxtp/packages/deployments/contracts/contracts/nomad-core/interfaces/IUpdaterManager";
import { Contract as MulticallContract } from "@hovoh/ethcall";
const _abi = [
  {
    inputs: [
      {
        internalType: "address payable",
        name: "_reporter",
        type: "address",
      },
    ],
    name: "slashUpdater",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "updater",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
export class IUpdaterManager__factory {
  static readonly abi = _abi;
  static createInterface(): IUpdaterManagerInterface {
    return new utils.Interface(_abi) as IUpdaterManagerInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IUpdaterManager {
    return new Contract(address, _abi, signerOrProvider) as IUpdaterManager;
  }
  static multicall(address: string): IUpdaterManagerMulticall {
    return new MulticallContract(
      address,
      _abi
    ) as unknown as IUpdaterManagerMulticall;
  }
}
