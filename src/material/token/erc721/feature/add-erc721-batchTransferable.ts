import type { ContractBuilder } from "../../../../utils/contract";
import { ERC721_BATCH_TRANSFERABLE } from "../../../path/erc721-path";

export function addERC721BatchTransferable(c: ContractBuilder) {
  c.addParent(ERC721_BATCH_TRANSFERABLE);
}
