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

export interface IAaveProtocolDataProviderInterface extends utils.Interface {
  functions: {
    "getReserveData(address)": FunctionFragment;
    "getUserReserveData(address,address)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic: "getReserveData" | "getUserReserveData"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "getReserveData",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "getUserReserveData",
    values: [string, string]
  ): string;

  decodeFunctionResult(
    functionFragment: "getReserveData",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getUserReserveData",
    data: BytesLike
  ): Result;

  events: {};
}

export interface IAaveProtocolDataProvider extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: IAaveProtocolDataProviderInterface;

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
    getReserveData(
      asset: string,
      overrides?: CallOverrides
    ): Promise<
      [
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        number
      ] & {
        unbacked: BigNumber;
        accruedToTreasuryScaled: BigNumber;
        totalAToken: BigNumber;
        totalStableDebt: BigNumber;
        totalVariableDebt: BigNumber;
        liquidityRate: BigNumber;
        variableBorrowRate: BigNumber;
        stableBorrowRate: BigNumber;
        averageStableBorrowRate: BigNumber;
        liquidityIndex: BigNumber;
        variableBorrowIndex: BigNumber;
        lastUpdateTimestamp: number;
      }
    >;

    getUserReserveData(
      asset: string,
      user: string,
      overrides?: CallOverrides
    ): Promise<
      [
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        number,
        boolean
      ] & {
        currentATokenBalance: BigNumber;
        currentStableDebt: BigNumber;
        currentVariableDebt: BigNumber;
        principalStableDebt: BigNumber;
        scaledVariableDebt: BigNumber;
        stableBorrowRate: BigNumber;
        liquidityRate: BigNumber;
        stableRateLastUpdated: number;
        usageAsCollateralEnabled: boolean;
      }
    >;
  };

  getReserveData(
    asset: string,
    overrides?: CallOverrides
  ): Promise<
    [
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber,
      number
    ] & {
      unbacked: BigNumber;
      accruedToTreasuryScaled: BigNumber;
      totalAToken: BigNumber;
      totalStableDebt: BigNumber;
      totalVariableDebt: BigNumber;
      liquidityRate: BigNumber;
      variableBorrowRate: BigNumber;
      stableBorrowRate: BigNumber;
      averageStableBorrowRate: BigNumber;
      liquidityIndex: BigNumber;
      variableBorrowIndex: BigNumber;
      lastUpdateTimestamp: number;
    }
  >;

  getUserReserveData(
    asset: string,
    user: string,
    overrides?: CallOverrides
  ): Promise<
    [
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber,
      number,
      boolean
    ] & {
      currentATokenBalance: BigNumber;
      currentStableDebt: BigNumber;
      currentVariableDebt: BigNumber;
      principalStableDebt: BigNumber;
      scaledVariableDebt: BigNumber;
      stableBorrowRate: BigNumber;
      liquidityRate: BigNumber;
      stableRateLastUpdated: number;
      usageAsCollateralEnabled: boolean;
    }
  >;

  callStatic: {
    getReserveData(
      asset: string,
      overrides?: CallOverrides
    ): Promise<
      [
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        number
      ] & {
        unbacked: BigNumber;
        accruedToTreasuryScaled: BigNumber;
        totalAToken: BigNumber;
        totalStableDebt: BigNumber;
        totalVariableDebt: BigNumber;
        liquidityRate: BigNumber;
        variableBorrowRate: BigNumber;
        stableBorrowRate: BigNumber;
        averageStableBorrowRate: BigNumber;
        liquidityIndex: BigNumber;
        variableBorrowIndex: BigNumber;
        lastUpdateTimestamp: number;
      }
    >;

    getUserReserveData(
      asset: string,
      user: string,
      overrides?: CallOverrides
    ): Promise<
      [
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        number,
        boolean
      ] & {
        currentATokenBalance: BigNumber;
        currentStableDebt: BigNumber;
        currentVariableDebt: BigNumber;
        principalStableDebt: BigNumber;
        scaledVariableDebt: BigNumber;
        stableBorrowRate: BigNumber;
        liquidityRate: BigNumber;
        stableRateLastUpdated: number;
        usageAsCollateralEnabled: boolean;
      }
    >;
  };

  filters: {};

  estimateGas: {
    getReserveData(
      asset: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getUserReserveData(
      asset: string,
      user: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    getReserveData(
      asset: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getUserReserveData(
      asset: string,
      user: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}

export interface IAaveProtocolDataProviderMulticall {
  address: string;
  abi: Fragment[];
  functions: FunctionFragment[];

  getReserveData(
    asset: string,
    overrides?: CallOverrides
  ): Call<
    [
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber,
      number
    ] & {
      unbacked: BigNumber;
      accruedToTreasuryScaled: BigNumber;
      totalAToken: BigNumber;
      totalStableDebt: BigNumber;
      totalVariableDebt: BigNumber;
      liquidityRate: BigNumber;
      variableBorrowRate: BigNumber;
      stableBorrowRate: BigNumber;
      averageStableBorrowRate: BigNumber;
      liquidityIndex: BigNumber;
      variableBorrowIndex: BigNumber;
      lastUpdateTimestamp: number;
    }
  >;

  getUserReserveData(
    asset: string,
    user: string,
    overrides?: CallOverrides
  ): Call<
    [
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber,
      number,
      boolean
    ] & {
      currentATokenBalance: BigNumber;
      currentStableDebt: BigNumber;
      currentVariableDebt: BigNumber;
      principalStableDebt: BigNumber;
      scaledVariableDebt: BigNumber;
      stableBorrowRate: BigNumber;
      liquidityRate: BigNumber;
      stableRateLastUpdated: number;
      usageAsCollateralEnabled: boolean;
    }
  >;
}
