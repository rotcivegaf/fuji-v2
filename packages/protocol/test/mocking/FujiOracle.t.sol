// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.15;

import {Test} from "forge-std/Test.sol";
import {FujiOracle} from "../../src/FujiOracle.sol";
import {MockERC20} from "../../src/mocks/MockERC20.sol";
import {MockChainlinkPriceFeed} from "../../src/mocks/MockChainlinkPriceFeed.sol";

contract FujiOracleUnitTests is Test {
  FujiOracle public fujiOracle;
  MockERC20 asset;
  MockChainlinkPriceFeed mockPriceFeed;

  function setUp() public {
    asset = new MockERC20("", "");

    mockPriceFeed = new MockChainlinkPriceFeed("ETH / USD", 8, 1);

    address[] memory assets = new address[](1);
    assets[0] = address(asset);
    address[] memory priceFeeds = new address[](1);
    priceFeeds[0] = address(mockPriceFeed);

    fujiOracle = new FujiOracle(assets, priceFeeds, address(0));
  }

  function test_getPriceOfOnNegativePrice() public {
    mockPriceFeed.setPriceFeedData("ETH / USD", 8, -1);

    vm.expectRevert(abi.encodeWithSelector(FujiOracle.FujiOracle__negativePrice.selector, -1));
    fujiOracle.getPriceOf(
      address(asset),
      address(0),
      8
    );
  }

  function test_getPriceOfOnStalePrice() public {
    mockPriceFeed.setAnsweredInRound(1);

    vm.expectRevert(FujiOracle.FujiOracle__stalePrice.selector);
    fujiOracle.getPriceOf(
      address(asset),
      address(0),
      8
    );
  }

  function test_getPriceOfOnRoundNotComplete() public {
    mockPriceFeed.setIsUpdatedAtZero();

    vm.expectRevert(FujiOracle.FujiOracle__roundNotComplete.selector);
    fujiOracle.getPriceOf(
      address(asset),
      address(0),
      8
    );
  }
}
