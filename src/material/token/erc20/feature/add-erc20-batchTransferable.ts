import type { ContractBuilder } from "../../../../utils/contract";
import { ERC20_BATCH_TRANSFERABLE } from "../path";

export function addERC20BatchTransferable(c: ContractBuilder) {
  c.addParent(ERC20_BATCH_TRANSFERABLE);
}
