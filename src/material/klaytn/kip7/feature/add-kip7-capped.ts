import type { ContractBuilder } from "../../../../utils/contract";
import { pathPrefix } from "../../../../utils/sourcecode";

export const premintPattern = /^(\d*)(?:\.(\d+))?(?:e(\d+))?$/;

export function addKIP7Capped(c: ContractBuilder, amount: string) {
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

      c.addParent({
        name: "KIP7Capped",
        path: `${pathPrefix}/klaytn/kip7/features/KIP7Capped.sol`,
      });

      c.addConstructorCode(`_setCap(${units} * 10 ** ${exp});`);
    }
  }
}
