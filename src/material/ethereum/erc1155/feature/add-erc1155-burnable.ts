import type { ContractBuilder } from "../../../../utils/contract";
import { pathPrefix } from "../../../../utils/sourcecode";

export function addERC1155Burnable(c: ContractBuilder) {
  c.addParent({
    name: "ERC1155Burnable",
    path: `${pathPrefix}/ethereum/erc1155/features/ERC1155Burnable.sol`,
  });
}
