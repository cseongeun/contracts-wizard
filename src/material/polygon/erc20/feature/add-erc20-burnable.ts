import type { ContractBuilder } from "../../../../utils/contract";
import { pathPrefix } from "../../../../utils/sourcecode";

export function addERC20Burnable(c: ContractBuilder) {
  c.addParent({
    name: "ERC20Burnable",
    path: `${pathPrefix}/polygon/erc20/features/ERC20Burnable.sol`,
  });
}
