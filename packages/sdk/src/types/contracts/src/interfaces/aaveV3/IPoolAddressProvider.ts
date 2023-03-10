/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BytesLike,
  CallOverrides,
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
} from "../../../common";

export interface IPoolAddressProviderInterface extends utils.Interface {
  functions: {
    "getPool()": FunctionFragment;
    "getPoolDataProvider()": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic: "getPool" | "getPoolDataProvider"
  ): FunctionFragment;

  encodeFunctionData(functionFragment: "getPool", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "getPoolDataProvider",
    values?: undefined
  ): string;

  decodeFunctionResult(functionFragment: "getPool", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getPoolDataProvider",
    data: BytesLike
  ): Result;

  events: {};
}

export interface IPoolAddressProvider extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: IPoolAddressProviderInterface;

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
    getPool(overrides?: CallOverrides): Promise<[string]>;

    getPoolDataProvider(overrides?: CallOverrides): Promise<[string]>;
  };

  getPool(overrides?: CallOverrides): Promise<string>;

  getPoolDataProvider(overrides?: CallOverrides): Promise<string>;

  callStatic: {
    getPool(overrides?: CallOverrides): Promise<string>;

    getPoolDataProvider(overrides?: CallOverrides): Promise<string>;
  };

  filters: {};

  estimateGas: {
    getPool(overrides?: CallOverrides): Promise<BigNumber>;

    getPoolDataProvider(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    getPool(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getPoolDataProvider(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}

export interface IPoolAddressProviderMulticall {
  address: string;
  abi: Fragment[];
  functions: FunctionFragment[];

  getPool(overrides?: CallOverrides): Call<string>;

  getPoolDataProvider(overrides?: CallOverrides): Call<string>;
}
