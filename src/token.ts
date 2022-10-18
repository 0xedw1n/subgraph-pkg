import { BigInt, BigDecimal, Address } from "@graphprotocol/graph-ts";
import { ERC20 } from "./abis/ERC20";
import { ERC20NameBytes } from "./abis/ERC20NameBytes";
import { ERC20SymbolBytes } from "./abis/ERC20SymbolBytes";
import { ZERO_BD } from "./constants";
import { convertTokenToDecimal, isNullEthValue } from "./math";

export function fetchTokenSymbol(tokenAddress: Address): string {
  let contract = ERC20.bind(tokenAddress);
  let contractSymbolBytes = ERC20SymbolBytes.bind(tokenAddress);

  // try types string and bytes32 for symbol
  let symbolValue = "unknown";
  let symbolResult = contract.try_symbol();
  if (symbolResult.reverted) {
    let symbolResultBytes = contractSymbolBytes.try_symbol();
    if (!symbolResultBytes.reverted) {
      // for broken pairs that have no symbol function exposed
      if (!isNullEthValue(symbolResultBytes.value.toHexString())) {
        symbolValue = symbolResultBytes.value.toString();
      }
    }
  } else {
    symbolValue = symbolResult.value;
  }

  return symbolValue;
}

export function fetchTokenName(tokenAddress: Address): string {
  let contract = ERC20.bind(tokenAddress);
  let contractNameBytes = ERC20NameBytes.bind(tokenAddress);

  // try types string and bytes32 for name
  let nameValue = "unknown";
  let nameResult = contract.try_name();
  if (nameResult.reverted) {
    let nameResultBytes = contractNameBytes.try_name();
    if (!nameResultBytes.reverted) {
      // for broken exchanges that have no name function exposed
      if (!isNullEthValue(nameResultBytes.value.toHexString())) {
        nameValue = nameResultBytes.value.toString();
      }
    }
  } else {
    nameValue = nameResult.value;
  }

  return nameValue;
}

export function fetchTokenDecimals(tokenAddress: Address): BigInt {
  let contract = ERC20.bind(tokenAddress);
  // try types uint8 for decimals
  let decimalValue = 0;
  let decimalResult = contract.try_decimals();
  if (!decimalResult.reverted) {
    decimalValue = decimalResult.value;
  }
  // @ts-expect-error
  return BigInt.fromI32(decimalValue as i32);
}

export function fetchTokenSupply(tokenAddress: Address): BigDecimal {
  let contract = ERC20.bind(tokenAddress);
  let decimal = fetchTokenDecimals(tokenAddress);

  let supplyValue = ZERO_BD;
  let supplyResult = contract.try_totalSupply();
  if (!supplyResult.reverted) {
    supplyValue = convertTokenToDecimal(supplyResult.value, decimal);
  }

  return supplyValue;
}

export function fetchTokenBalance(
  tokenAddress: Address,
  userAddress: Address
): BigDecimal {
  let contract = ERC20.bind(tokenAddress);
  let decimal = fetchTokenDecimals(tokenAddress);

  let balanceValue = ZERO_BD;
  let balanceResult = contract.try_balanceOf(userAddress);
  if (!balanceResult.reverted) {
    balanceValue = convertTokenToDecimal(balanceResult.value, decimal);
  }

  return balanceValue;
}
