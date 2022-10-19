import { BigInt, BigDecimal, Address } from "@graphprotocol/graph-ts";
import { ZERO_BI, ZERO_BD, ONE_BI, BI_18 } from "./constants";

/**
 * @param  {BigInt} decimals
 * @returns {BigInt} bi
 */
export function exponentToBigInt(decimals: BigInt): BigInt {
  let bi = BigInt.fromString("1");
  for (let i = ZERO_BI; i.lt(decimals as BigInt); i = i.plus(ONE_BI)) {
    bi = bi.times(BigInt.fromString("10"));
  }
  return bi;
}

/**
 * @param  {BigInt} decimals
 * @returns {BigDecimal} bd
 */
export function exponentToBigDecimal(decimals: BigInt): BigDecimal {
  let bd = BigDecimal.fromString("1");
  for (let i = ZERO_BI; i.lt(decimals as BigInt); i = i.plus(ONE_BI)) {
    bd = bd.times(BigDecimal.fromString("10"));
  }
  return bd;
}

/**
 * @param  {BigInt} wei amount in wei
 * @returns {BigDecimal} amount in ether
 */
export function convertEthToDecimal(wei: BigInt): BigDecimal {
  if (wei === ZERO_BI) return ZERO_BD;
  return wei.toBigDecimal().div(exponentToBigDecimal(BI_18));
}

/**
 * @param  {BigInt} wei amount in wei
 * @param  {BigInt} decimals token decimal
 * @returns {BigDecimal} native amount w.r.t. token decimals
 */
export function convertTokenToDecimal(
  wei: BigInt,
  decimals: BigInt
): BigDecimal {
  if (decimals === ZERO_BI || wei === ZERO_BI) {
    return wei.toBigDecimal();
  }
  return wei.toBigDecimal().div(exponentToBigDecimal(decimals));
}

/**
 * @param  {BigDecimal} value
 * @returns {boolean} return true if value equals to zero
 */
export function equalToZero(value: BigDecimal): boolean {
  const formattedVal = parseFloat(value.toString());
  const zero = parseFloat(ZERO_BD.toString());
  if (zero == formattedVal) {
    return true;
  }
  return false;
}

/**
 * @param  {string} value amout
 * @returns {boolean} return true if value equals to null eth value
 */
export function isNullEthValue(value: string): boolean {
  return (
    value ===
    "0x0000000000000000000000000000000000000000000000000000000000000001"
  );
}
