import type { ContractBuilder } from "../../../../utils/contract";
import { pathPrefix } from "../../../../utils/sourcecode";

export function addBEP721Burnable(c: ContractBuilder) {
  c.addParent({
    name: "BEP721Burnable",
    path: `${pathPrefix}/binanceSmartChain/bep721/features/BEP721Burnable.sol`,
  });
}
