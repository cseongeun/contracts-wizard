import type { ContractBuilder } from "../../../../utils/contract";
import { pathPrefix } from "../../../../utils/sourcecode";

export function addBEP20BatchTransferable(c: ContractBuilder) {
  c.addParent({
    name: "BEP20BatchTransferable",
    path: `${pathPrefix}/binanceSmartChain/bep20/features/BEP20BatchTransferable.sol`,
  });
}
