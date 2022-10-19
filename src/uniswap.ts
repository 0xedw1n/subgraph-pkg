import { Address, BigDecimal, BigInt } from "@graphprotocol/graph-ts";
import { PancakePair } from "./abis/PancakePair";
import { PancakeFactory } from "./abis/PancakeFactory";
import { ADDRESS_ZERO, ZERO_BD, ZERO_BI } from "./constants";
import { convertEthToDecimal } from "./math";
import { safeDiv } from "./utils";

/**
 * @param  {Address} pairAddress
 * @returns {BigDecimal} return [reserve0, reserve1] amount of an UniswapPair.
 * @unit wei
 */
export function getUniswapPairReserves(pairAddress: Address): BigInt[] {
  let contract = PancakePair.bind(pairAddress);

  let reserveResult = contract.try_getReserves();
  return !contract.try_getReserves().reverted
    ? [reserveResult.value.value0, reserveResult.value.value1]
    : [ZERO_BI, ZERO_BI];
}

/**
 * @param  {Address} factoryAddress address of UniswapFactory
 * @param {Address} token0 address of token0
 * @param {Address} token1 address of token1
 * @returns {Address} fetch UniswapPairAddress of [token0, token1]
 */
export function getUniswapPairAddress(
  factoryAddress: Address,
  token0: Address,
  token1: Address
): Address {
  let contract = PancakeFactory.bind(factoryAddress);

  return !contract.try_getPair(token0, token1).reverted
    ? contract.try_getPair(token0, token1).value
    : Address.fromString(ADDRESS_ZERO);
}

/**
 * @param {Address} token0 address of token0
 * @param {Address} token1 address of token1
 * @returns {Address[]} sort token0, token1 address in asc order
 */
export function sortUniswapPairTokens(
  token0: Address,
  token1: Address
): Address[] {
  return token0.toHexString() < token1.toHexString()
    ? [token0, token1]
    : [token1, token0];
}

/**
 * @param {Address} factoryAddress address of UniswapFactory
 * @param {Address} token0 address of token0
 * @param {Address} token1 address of token1
 * @returns {BigDecimal} return token price of token0 w.r.t. token1
 */
export function getRelativePrice(
  factoryAddress: Address,
  token0: Address,
  token1: Address
): BigDecimal {
  let pairAddress = getUniswapPairAddress(factoryAddress, token0, token1);
  let [reserve0, reserve1] = getUniswapPairReserves(pairAddress);
  let [_token0, _token1] = sortUniswapPairTokens(token0, token1);

  let _reserve0 = convertEthToDecimal(reserve0);
  let _reserve1 = convertEthToDecimal(reserve1);
  if (token0.equals(_token0) && token1.equals(_token1)) {
    return safeDiv(_reserve1, _reserve0);
  } else if (token0.equals(_token0) && token1.equals(_token1)) {
    return safeDiv(_reserve0, _reserve1);
  } else {
    return ZERO_BD;
  }
}
