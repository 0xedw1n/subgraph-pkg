import { BigDecimal, Address } from "@graphprotocol/graph-ts";
import { ZERO_BD } from "./constants";

/**
 * @param  {string} x
 * @param  {string} y
 * @notice compare string x and y as Address
 */
export function safeStrCompare(x: string, y: string): boolean {
  return Address.fromString(x).equals(Address.fromString(y));
}

/**
 * @param  {BigDecimal} x
 * @param  {BigDecimal} y
 * @returns {BigDecimal} return x.div(y) or ZERO_BD
 */
export function safeDiv(x: BigDecimal, y: BigDecimal): BigDecimal {
  return x > ZERO_BD && y > ZERO_BD ? x.div(y) : ZERO_BD;
}
