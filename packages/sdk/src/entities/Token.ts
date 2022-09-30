import { BigNumber } from '@ethersproject/bignumber';
import { JsonRpcProvider } from '@ethersproject/providers';
import invariant from 'tiny-invariant';

import { ChainId } from '../enums';
import { ConfigParams } from '../types';
import { ERC20 as ERC20Contract, ERC20__factory } from '../types/contracts';
import { AbstractCurrency } from './AbstractCurrency';
import { Address } from './Address';
import { Config } from './Config';
import { Currency } from './Currency';

/**
 * Represents an ERC20 token with a unique address and some metadata.
 */
export class Token extends AbstractCurrency {
  readonly chainId: ChainId;
  readonly address: Address;

  readonly isNative: false = false as const;
  readonly isToken: true = true as const;

  /**
   * Instance of ethers Contract class, already initialized with address and rpc provider.
   * It's ready to be used by calling the methods available on the smart contract.
   */
  contract?: ERC20Contract;

  constructor(
    chainId: ChainId,
    address: Address,
    decimals: number,
    symbol: string,
    name?: string
  ) {
    super(chainId, decimals, symbol, name);
    this.chainId = chainId;
    this.address = address;
  }

  /**
   * Return this token, which does not need to be wrapped
   */
  get wrapped(): Token {
    return this;
  }

  /**
   * {@inheritDoc AbstractCurrency.setConnection}
   */
  setConnection(configParams: ConfigParams): Token {
    const rpcProvider: JsonRpcProvider = Config.rpcProviderFrom(
      configParams,
      this.chainId
    );

    this.contract = ERC20__factory.connect(this.address.value, rpcProvider);

    return this;
  }

  /**
   * {@inheritDoc AbstractCurrency.balanceOf}
   * @throws if {@link setConnection} was not called beforehand
   */
  async balanceOf(account: Address): Promise<BigNumber> {
    invariant(this.contract, 'Connection not set!');
    return this.contract.balanceOf(account.value);
  }

  /**
   * {@inheritDoc AbstractCurrency.allowance}
   * @throws if {@link setConnection} was not called
   */
  async allowance(owner: Address, spender: Address): Promise<BigNumber> {
    invariant(this.contract, 'Connection not set!');
    return this.contract.allowance(owner.value, spender.value);
  }

  /**
   * Returns true if the two tokens are equivalent, i.e. have the same chainId and address.
   *
   * @param other - other token to compare
   */
  equals(other: Currency): boolean {
    return (
      other.isToken &&
      this.chainId === other.chainId &&
      this.address === other.address
    );
  }

  /**
   * Returns true if the address of this token sorts before the address of the other token
   *
   * @param other - other token to compare
   * @throws if the tokens have the same address
   * @throws if the tokens are on different chains
   */
  sortsBefore(other: Token): boolean {
    invariant(this.chainId === other.chainId, 'CHAIN_IDS');
    invariant(this.address !== other.address, 'ADDRESSES');
    return this.address.value.toLowerCase() < other.address.value.toLowerCase();
  }
}

/**
 * Compares two currencies for equality
 */
export function currencyEquals(
  currencyA: Currency,
  currencyB: Currency
): boolean {
  if (currencyA instanceof Token && currencyB instanceof Token) {
    return currencyA.equals(currencyB);
  } else if (currencyA instanceof Token) {
    return false;
  } else if (currencyB instanceof Token) {
    return false;
  } else {
    return currencyA === currencyB;
  }
}