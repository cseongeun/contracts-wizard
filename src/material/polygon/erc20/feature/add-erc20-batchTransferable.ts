import type { ContractBuilder } from "../../../../utils/contract";
import { pathPrefix } from "../../../../utils/sourcecode";

export function addERC20BatchTransferable(c: ContractBuilder) {
  c.addParent({
    name: "ERC20BatchTransferable",
    path: `${pathPrefix}/polygon/erc20/features/ERC20BatchTransferable.sol`,
  });
}
