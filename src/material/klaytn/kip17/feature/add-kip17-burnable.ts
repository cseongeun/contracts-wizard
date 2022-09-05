import type { ContractBuilder } from "../../../../utils/contract";
import { pathPrefix } from "../../../../utils/sourcecode";

export function addKIP17Burnable(c: ContractBuilder) {
  c.addParent({
    name: "KIP17Burnable",
    path: `${pathPrefix}/klaytn/kip17/features/KIP17Burnable.sol`,
  });
}
