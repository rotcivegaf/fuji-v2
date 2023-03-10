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
} from "../../../common";

export interface AaveV3RinkebyInterface extends utils.Interface {
  functions: {
    "approvedOperator(address)": FunctionFragment;
    "borrow(address,uint256)": FunctionFragment;
    "deposit(address,uint256)": FunctionFragment;
    "getBorrowBalance(address,address)": FunctionFragment;
    "getBorrowRateFor(address)": FunctionFragment;
    "getDepositBalance(address,address)": FunctionFragment;
    "getDepositRateFor(address)": FunctionFragment;
    "payback(address,uint256)": FunctionFragment;
    "withdraw(address,uint256)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "approvedOperator"
      | "borrow"
      | "deposit"
      | "getBorrowBalance"
      | "getBorrowRateFor"
      | "getDepositBalance"
      | "getDepositRateFor"
      | "payback"
      | "withdraw"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "approvedOperator",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "borrow",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "deposit",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getBorrowBalance",
    values: [string, string]
  ): string;
  encodeFunctionData(
    functionFragment: "getBorrowRateFor",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "getDepositBalance",
    values: [string, string]
  ): string;
  encodeFunctionData(
    functionFragment: "getDepositRateFor",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "payback",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "withdraw",
    values: [string, BigNumberish]
  ): string;

  decodeFunctionResult(
    functionFragment: "approvedOperator",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "borrow", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "deposit", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getBorrowBalance",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getBorrowRateFor",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getDepositBalance",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getDepositRateFor",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "payback", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "withdraw", data: BytesLike): Result;

  events: {};
}

export interface AaveV3Rinkeby extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: AaveV3RinkebyInterface;

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
    approvedOperator(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<[string] & { operator: string }>;

    borrow(
      asset: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    deposit(
      asset: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    getBorrowBalance(
      asset: string,
      user: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { balance: BigNumber }>;

    getBorrowRateFor(
      asset: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { rate: BigNumber }>;

    getDepositBalance(
      asset: string,
      user: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { balance: BigNumber }>;

    getDepositRateFor(
      asset: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { rate: BigNumber }>;

    payback(
      asset: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    withdraw(
      asset: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  approvedOperator(arg0: string, overrides?: CallOverrides): Promise<string>;

  borrow(
    asset: string,
    amount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  deposit(
    asset: string,
    amount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  getBorrowBalance(
    asset: string,
    user: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  getBorrowRateFor(
    asset: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  getDepositBalance(
    asset: string,
    user: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  getDepositRateFor(
    asset: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  payback(
    asset: string,
    amount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  withdraw(
    asset: string,
    amount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    approvedOperator(arg0: string, overrides?: CallOverrides): Promise<string>;

    borrow(
      asset: string,
      amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;

    deposit(
      asset: string,
      amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;

    getBorrowBalance(
      asset: string,
      user: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getBorrowRateFor(
      asset: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getDepositBalance(
      asset: string,
      user: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getDepositRateFor(
      asset: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    payback(
      asset: string,
      amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;

    withdraw(
      asset: string,
      amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;
  };

  filters: {};

  estimateGas: {
    approvedOperator(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    borrow(
      asset: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    deposit(
      asset: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    getBorrowBalance(
      asset: string,
      user: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getBorrowRateFor(
      asset: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getDepositBalance(
      asset: string,
      user: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getDepositRateFor(
      asset: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    payback(
      asset: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    withdraw(
      asset: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    approvedOperator(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    borrow(
      asset: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    deposit(
      asset: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    getBorrowBalance(
      asset: string,
      user: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getBorrowRateFor(
      asset: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getDepositBalance(
      asset: string,
      user: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getDepositRateFor(
      asset: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    payback(
      asset: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    withdraw(
      asset: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}

export interface AaveV3RinkebyMulticall {
  address: string;
  abi: Fragment[];
  functions: FunctionFragment[];

  approvedOperator(arg0: string, overrides?: CallOverrides): Call<string>;

  getBorrowBalance(
    asset: string,
    user: string,
    overrides?: CallOverrides
  ): Call<BigNumber>;

  getBorrowRateFor(asset: string, overrides?: CallOverrides): Call<BigNumber>;

  getDepositBalance(
    asset: string,
    user: string,
    overrides?: CallOverrides
  ): Call<BigNumber>;

  getDepositRateFor(asset: string, overrides?: CallOverrides): Call<BigNumber>;
}
