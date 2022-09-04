import type { ContractBuilder } from "../../../../utils/contract";
import { pathPrefix } from "../../../../utils/sourcecode";

export function addKIP7BatchTransferable(c: ContractBuilder) {
  c.addParent({
    name: "KIP7BatchTransferable",
    path: `${pathPrefix}/klaytn/kip7/features/KIP7BatchTransferable.sol`,
  });
}
