import type { ContractBuilder } from "../../../../utils/contract";
import { pathPrefix } from "../../../../utils/sourcecode";

export function addKIP7Burnable(c: ContractBuilder) {
  c.addParent({
    name: "KIP7Burnable",
    path: `${pathPrefix}/klaytn/kip7/features/KIP7Burnable.sol`,
  });
}
