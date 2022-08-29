import type { ContractBuilder } from "../../../../utils/contract";

export const premintPattern = /^(\d*)(?:\.(\d+))?(?:e(\d+))?$/;

export function addKIP7Premint(c: ContractBuilder, amount: string) {
  const m = amount.match(premintPattern);
  if (m) {
    const integer = m[1]?.replace(/^0+/, "") ?? "";
    const decimals = m[2]?.replace(/0+$/, "") ?? "";
    const exponent = Number(m[3] ?? 0);

    if (Number(integer + decimals) > 0) {
      const decimalPlace = decimals.length - exponent;
      const zeroes = new Array(Math.max(0, -decimalPlace)).fill("0").join("");
      const units = integer + decimals + zeroes;
      const exp =
        decimalPlace <= 0 ? "decimals()" : `(decimals() - ${decimalPlace})`;
      c.addConstructorCode(`_mint(msg.sender, ${units} * 10 ** ${exp});`);
    }
  }
}
