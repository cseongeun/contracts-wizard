import type { ContractBuilder } from "../../../../utils/contract";
import { ERC20_BURNABLE } from "../path";

export function addERC20Burnable(c: ContractBuilder) {
  c.addParent(ERC20_BURNABLE);
}
