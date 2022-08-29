import type { ContractBuilder } from "../../../contract";
import { pathPrefix } from "../../../sourcecode";

export function addKIP37Burnable(c: ContractBuilder) {
  c.addParent({
    name: "KIP37Burnable",
    path: `${pathPrefix}/klaytn/kip37/features/KIP37Burnable.sol`,
  });
}
