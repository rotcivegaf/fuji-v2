// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.15;

import {ERC20} from "openzeppelin-contracts/contracts/token/ERC20/ERC20.sol";

contract MockERC20 is ERC20 {
  event DepositRecorded(string provider, address from, uint256 value);
  event WithdrawRecorded(string provider, address from, uint256 value);

  mapping(string => mapping(address => uint256)) private _balancesDeposit;

  event BorrowRecorded(string provider, address from, uint256 value);
  event PaybackRecorded(string provider, address from, uint256 value);

  mapping(string => mapping(address => uint256)) private _balancesDebt;

  constructor(string memory _name, string memory _symbol) ERC20(_name, _symbol) {}

  function mint(address to, uint256 value) public {
    _mint(to, value);
  }

  function burn(address from, uint256 value) public {
    _burn(from, value);
  }

  function makeDeposit(address from, uint256 value, string memory provider) public {
    _balancesDeposit[provider][from] += value;
    _burn(from, value);
    emit DepositRecorded(provider, from, value);
  }

  function withdrawDeposit(address to, uint256 value, string memory provider) public {
    _balancesDeposit[provider][to] -= value;
    _mint(to, value);
    emit WithdrawRecorded(provider, to, value);
  }

  function mintDebt(address to, uint256 value, string memory provider) public {
    _balancesDebt[provider][to] += value;
    _mint(to, value);
    emit BorrowRecorded(provider, to, value);
  }

  function burnDebt(address from, uint256 value, string memory provider) public {
    _balancesDebt[provider][from] -= value;
    _burn(from, value);
    emit PaybackRecorded(provider, from, value);
  }

  function balanceOfDebt(address who, string memory provider) public view returns (uint256) {
    return _balancesDebt[provider][who];
  }

  function balanceOfDeposit(address who, string memory provider) public view returns (uint256) {
    return _balancesDeposit[provider][who];
  }
}
