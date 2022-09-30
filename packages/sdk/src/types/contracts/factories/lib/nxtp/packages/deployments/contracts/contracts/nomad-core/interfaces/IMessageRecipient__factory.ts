/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import type { Provider } from "@ethersproject/providers";
import { Contract, Signer, utils } from "ethers";
import type {
  IMessageRecipient,
  IMessageRecipientInterface,
  IMessageRecipientMulticall,
} from "../../../../../../../../../lib/nxtp/packages/deployments/contracts/contracts/nomad-core/interfaces/IMessageRecipient";
import { Contract as MulticallContract } from "@hovoh/ethcall";
const _abi = [
  {
    inputs: [
      {
        internalType: "uint32",
        name: "_origin",
        type: "uint32",
      },
      {
        internalType: "uint32",
        name: "_nonce",
        type: "uint32",
      },
      {
        internalType: "bytes32",
        name: "_sender",
        type: "bytes32",
      },
      {
        internalType: "bytes",
        name: "_message",
        type: "bytes",
      },
    ],
    name: "handle",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];
export class IMessageRecipient__factory {
  static readonly abi = _abi;
  static createInterface(): IMessageRecipientInterface {
    return new utils.Interface(_abi) as IMessageRecipientInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IMessageRecipient {
    return new Contract(address, _abi, signerOrProvider) as IMessageRecipient;
  }
  static multicall(address: string): IMessageRecipientMulticall {
    return new MulticallContract(
      address,
      _abi
    ) as unknown as IMessageRecipientMulticall;
  }
}