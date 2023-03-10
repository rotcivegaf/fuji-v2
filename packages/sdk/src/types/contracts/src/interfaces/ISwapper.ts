/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type { Fragment, FunctionFragment, Result } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";

import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
} from "../../common";

export interface ISwapperInterface extends utils.Interface {
  functions: {
    "swap(address,address,uint256,uint256,address,address,uint256)": FunctionFragment;
  };

  getFunction(nameOrSignatureOrTopic: "swap"): FunctionFragment;

  encodeFunctionData(
    functionFragment: "swap",
    values: [
      string,
      string,
      BigNumberish,
      BigNumberish,
      string,
      string,
      BigNumberish
    ]
  ): string;

  decodeFunctionResult(functionFragment: "swap", data: BytesLike): Result;

  events: {};
}

export interface ISwapper extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: ISwapperInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    swap(
      assetIn: string,
      assetOut: string,
      amountIn: BigNumberish,
      amountOut: BigNumberish,
      receiver: string,
      sweeper: string,
      minSweepOut: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  swap(
    assetIn: string,
    assetOut: string,
    amountIn: BigNumberish,
    amountOut: BigNumberish,
    receiver: string,
    sweeper: string,
    minSweepOut: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    swap(
      assetIn: string,
      assetOut: string,
      amountIn: BigNumberish,
      amountOut: BigNumberish,
      receiver: string,
      sweeper: string,
      minSweepOut: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {};

  estimateGas: {
    swap(
      assetIn: string,
      assetOut: string,
      amountIn: BigNumberish,
      amountOut: BigNumberish,
      receiver: string,
      sweeper: string,
      minSweepOut: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    swap(
      assetIn: string,
      assetOut: string,
      amountIn: BigNumberish,
      amountOut: BigNumberish,
      receiver: string,
      sweeper: string,
      minSweepOut: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}

export interface ISwapperMulticall {
  address: string;
  abi: Fragment[];
  functions: FunctionFragment[];
}
