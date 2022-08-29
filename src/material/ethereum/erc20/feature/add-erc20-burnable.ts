import type { ContractBuilder } from "../../../contract";
import { pathPrefix } from "../../../sourcecode";

export function addERC20Burnable(c: ContractBuilder) {
  c.addParent({
    name: "ERC20Burnable",
    path: `${pathPrefix}/ethereum/erc20/features/ERC20Burnable.sol`,
  });
}
