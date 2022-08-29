import type { ContractBuilder } from "../../../../utils/contract";
import { pathPrefix } from "../../../../utils/sourcecode";

export function addKIP37Burnable(c: ContractBuilder) {
  c.addParent({
    name: "KIP37Burnable",
    path: `${pathPrefix}/klaytn/kip37/features/KIP37Burnable.sol`,
  });
}
