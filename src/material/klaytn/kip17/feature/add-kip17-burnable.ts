import type { ContractBuilder } from "../../../contract";
import { pathPrefix } from "../../../sourcecode";

export function addKIP17Burnable(c: ContractBuilder) {
  c.addParent({
    name: "KIP17Burnable",
    path: `${pathPrefix}/ethereum/kip17/features/KIP17Burnable.sol`,
  });
}
