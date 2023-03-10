/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import type { Provider } from "@ethersproject/providers";
import { Contract, Signer, utils } from "ethers";
import type {
  TypedMemView,
  TypedMemViewInterface,
  TypedMemViewMulticall,
} from "../../../../../../../../../lib/nxtp/packages/deployments/contracts/contracts/nomad-core/libs/TypedMemView";
import { Contract as MulticallContract } from "@hovoh/ethcall";
const _abi = [
  {
    inputs: [],
    name: "NULL",
    outputs: [
      {
        internalType: "bytes29",
        name: "",
        type: "bytes29",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
export class TypedMemView__factory {
  static readonly abi = _abi;
  static createInterface(): TypedMemViewInterface {
    return new utils.Interface(_abi) as TypedMemViewInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): TypedMemView {
    return new Contract(address, _abi, signerOrProvider) as TypedMemView;
  }
  static multicall(address: string): TypedMemViewMulticall {
    return new MulticallContract(
      address,
      _abi
    ) as unknown as TypedMemViewMulticall;
  }
}
