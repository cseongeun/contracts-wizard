import type { ContractBuilder } from "../../../../utils/contract";
import { pathPrefix } from "../../../../utils/sourcecode";

export function addBEP1155Burnable(c: ContractBuilder) {
  c.addParent({
    name: "BEP1155Burnable",
    path: `${pathPrefix}/binanceSmartChain/bep1155/features/BEP1155Burnable.sol`,
  });
}
