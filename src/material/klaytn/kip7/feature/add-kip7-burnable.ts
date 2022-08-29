import type { ContractBuilder } from "../../../contract";
import { pathPrefix } from "../../../sourcecode";

export function addKIP7Burnable(c: ContractBuilder) {
  c.addParent({
    name: "KIP7Burnable",
    path: `${pathPrefix}/klaytn/kip7/features/KIP7Burnable.sol`,
  });
}
