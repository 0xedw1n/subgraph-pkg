import { BigDecimal, BigInt } from "@graphprotocol/graph-ts";
import { ZERO_BD } from "./constants";

// @ts-expect-error
export function removeFromArrayAtIndex<T>(x: T[], index: i32): T[] {
  let retval = new Array<T>(x.length - 1);
  let nI = 0;
  for (let i = 0; i < x.length; i++) {
    if (i != index) {
      retval[nI] = x[i];
      nI += 1;
    }
  }
  return retval;
}

// @ts-expect-error
export function addToArrayAtIndex<T>(x: T[], item: T, index: i32): T[] {
  if (x.length == 0) {
    return [item];
  }
  let retval = new Array<T>();
  let i = 0;
  while (i < index) {
    retval.push(x[i]);
    i += 1;
  }
  retval.push(item);
  while (i < x.length) {
    retval.push(x[i]);
    i += 1;
  }
  return retval;
}

export function arrayDiff<T>(a: T[], b: T[]): T[] {
  let diff: T[] = new Array<T>();
  // @ts-expect-error
  for (let i: i32 = 0; i < a.length; i++) {
    if (b.indexOf(a[i]) == -1) {
      diff = diff.concat([a[i]]);
    }
  }

  return diff;
}

export function arrayUnique<T>(array: T[]): T[] {
  let unique: T[] = new Array<T>();
  // @ts-expect-error
  for (let i: i32 = 0; i < array.length; i++) {
    if (array.indexOf(array[i]) == i) {
      unique = unique.concat([array[i]]);
    }
  }

  return unique;
}

export function arrayUniqueBy<T>(array: T[], pluck: (item: T) => string): T[] {
  let references = array.map<string>((item) => pluck(item));
  let unique: T[] = new Array<T>();
  // @ts-expect-error
  for (let i: i32 = 0; i < references.length; i++) {
    if (references.indexOf(references[i]) == i) {
      unique = unique.concat([array[i]]);
    }
  }

  return unique;
}

export function calculateAverage(prices: BigDecimal[]): BigDecimal {
  if (!prices.length) return ZERO_BD;

  let sum = BigDecimal.fromString("0");
  for (let i = 0; i < prices.length; i++) {
    sum = sum.plus(prices[i]);
  }

  return sum.div(
    BigDecimal.fromString(BigInt.fromI32(prices.length).toString())
  );
}

export function calculateMedian(prices: BigDecimal[]): BigDecimal {
  if (prices.length === 0) return ZERO_BD;
  if (prices.length === 1) return prices[1];
  let sorted = prices.sort((a, b) => {
    return a.equals(b) ? 0 : a.gt(b) ? 1 : -1;
  });
  //@ts-expect-error
  let mid = Math.ceil(sorted.length / 2) as i32;
  if (sorted.length % 2 == 0) {
    return sorted[mid].plus(sorted[mid - 1]).div(BigDecimal.fromString("2"));
  }

  return sorted[mid - 1];
}
