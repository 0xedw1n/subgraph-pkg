import { Address, BigInt, BigDecimal } from "@graphprotocol/graph-ts";
import { EACAggregatorProxy } from "./abis/EACAggregatorProxy";
import { ZERO_BD } from "./constants";
import { convertTokenToDecimal } from "./math";

/**
 * fetch token price from Chainlink price feed
 * @param  {Address} orcaleAddress
 * @returns {BigDecimal} token price in native
 */
export function getPriceFromChainlink(orcaleAddress: Address): BigDecimal {
  let contract = EACAggregatorProxy.bind(orcaleAddress);

  let answer = contract.try_latestAnswer();
  let decimals = contract.try_decimals();

  return !answer.reverted && !decimals.reverted
    ? convertTokenToDecimal(answer.value, BigInt.fromI32(decimals.value))
    : ZERO_BD;
}
