import { BigDecimal } from "@graphprotocol/graph-ts";
import { BD_SEC_PER_YR } from "./constants";
import { safeDiv } from "./utils";

/**
 * @param  {BigDecimal} tokenPerSec
 * @returns {BigDecimal} return annual token emission
 */
export function getNativeAnnualReward(tokenPerSec: BigDecimal): BigDecimal {
  return BD_SEC_PER_YR.times(tokenPerSec);
}

/**
 * @param  {BigDecimal} tokenPerSec
 * @param  {BigDecimal} tokenPrice
 * @returns {BigDecimal} return annual token emission in USD
 */
export function getUsdAnnualReward(
  tokenPerSec: BigDecimal,
  tokenPrice: BigDecimal
): BigDecimal {
  return getNativeAnnualReward(tokenPerSec).times(tokenPrice);
}

/**
 * @param  {BigDecimal} annualReward total annual reward in USD of a pool
 * @param  {BigDecimal} totalDeposit total value staked in USD of a pool
 * @returns {BigDecimal} return apr in decimal
 */
export function calculateSimpleApr(
  annualReward: BigDecimal,
  totalDeposit: BigDecimal
): BigDecimal {
  return safeDiv(annualReward, totalDeposit);
}
