import type { ContractBuilder } from "../../../../utils/contract";
import { pathPrefix } from "../../../../utils/sourcecode";

export function addERC721Burnable(c: ContractBuilder) {
  c.addParent({
    name: "ERC721Burnable",
    path: `${pathPrefix}/ethereum/erc721/features/ERC721Burnable.sol`,
  });
}
