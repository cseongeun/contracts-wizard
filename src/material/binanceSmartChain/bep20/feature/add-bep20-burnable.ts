import type { ContractBuilder } from "../../../../utils/contract";
import { pathPrefix } from "../../../../utils/sourcecode";

export function addBEP20Burnable(c: ContractBuilder) {
  c.addParent({
    name: "BEP20Burnable",
    path: `${pathPrefix}/binanceSmartChain/bep20/features/BEP20Burnable.sol`,
  });
}
