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
import type { Call } from "@hovoh/ethcall";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
} from "../../common";

export interface MockSwapperInterface extends utils.Interface {
  functions: {
    "oracle()": FunctionFragment;
    "swap(address,address,uint256,uint256,address,address,uint256)": FunctionFragment;
  };

  getFunction(nameOrSignatureOrTopic: "oracle" | "swap"): FunctionFragment;

  encodeFunctionData(functionFragment: "oracle", values?: undefined): string;
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

  decodeFunctionResult(functionFragment: "oracle", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "swap", data: BytesLike): Result;

  events: {};
}

export interface MockSwapper extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: MockSwapperInterface;

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
    oracle(overrides?: CallOverrides): Promise<[string]>;

    swap(
      assetIn: string,
      assetOut: string,
      amountIn: BigNumberish,
      amountOut: BigNumberish,
      receiver: string,
      sweeper: string,
      slippage: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  oracle(overrides?: CallOverrides): Promise<string>;

  swap(
    assetIn: string,
    assetOut: string,
    amountIn: BigNumberish,
    amountOut: BigNumberish,
    receiver: string,
    sweeper: string,
    slippage: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    oracle(overrides?: CallOverrides): Promise<string>;

    swap(
      assetIn: string,
      assetOut: string,
      amountIn: BigNumberish,
      amountOut: BigNumberish,
      receiver: string,
      sweeper: string,
      slippage: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {};

  estimateGas: {
    oracle(overrides?: CallOverrides): Promise<BigNumber>;

    swap(
      assetIn: string,
      assetOut: string,
      amountIn: BigNumberish,
      amountOut: BigNumberish,
      receiver: string,
      sweeper: string,
      slippage: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    oracle(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    swap(
      assetIn: string,
      assetOut: string,
      amountIn: BigNumberish,
      amountOut: BigNumberish,
      receiver: string,
      sweeper: string,
      slippage: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}

export interface MockSwapperMulticall {
  address: string;
  abi: Fragment[];
  functions: FunctionFragment[];

  oracle(overrides?: CallOverrides): Call<string>;
}
