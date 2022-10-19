import { BigInt, BigDecimal } from "@graphprotocol/graph-ts";

export const ADDRESS_ZERO = "0x0000000000000000000000000000000000000000";
export const ZERO_BI = BigInt.fromI32(0);
export const ONE_BI = BigInt.fromI32(1);
export const ZERO_BD = BigDecimal.fromString("0");
export const ONE_BD = BigDecimal.fromString("1");
export const TWO_BD = BigDecimal.fromString("2");
export const BI_6 = BigInt.fromI32(6);
export const BI_18 = BigInt.fromI32(18);

export const WEI = BigDecimal.fromString("1");
export const GWEI = BigDecimal.fromString("1000000000");
export const ETHER = BigDecimal.fromString("1000000000000000000");

export const SEC_PER_DAY = 60 * 60 * 24;
export const SEC_PER_YR = 60 * 60 * 24 * 365;

export const BD_SEC_PER_DAY = BigDecimal.fromString(SEC_PER_DAY.toString());
export const BD_SEC_PER_YR = BigDecimal.fromString(SEC_PER_YR.toString());
