import { Address, BigInt } from "@graphprotocol/graph-ts";
import { PancakePair } from "./abis/PancakePair";
import { PancakeFactory } from "./abis/PancakeFactory";
import { ADDRESS_ZERO, ZERO_BI } from "./constants";

export function getUniswapPairReserves(pairAddress: Address): BigInt[] {
  let contract = PancakePair.bind(pairAddress);

  let reserveResult = contract.try_getReserves();
  return !contract.try_getReserves().reverted
    ? [reserveResult.value.value0, reserveResult.value.value1]
    : [ZERO_BI, ZERO_BI];
}

export function getUniswapPairAddress(
  factoryAddress: Address,
  token0: Address,
  token1: Address
): string {
  let contract = PancakeFactory.bind(factoryAddress);

  return !contract.try_getPair(token0, token1).reverted
    ? contract.try_getPair(token0, token1).value.toHexString()
    : ADDRESS_ZERO;
}
