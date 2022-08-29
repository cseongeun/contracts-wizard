import type { ContractBuilder } from "../../../contract";
import { pathPrefix } from "../../../sourcecode";

export function addERC721Burnable(c: ContractBuilder) {
  c.addParent({
    name: "ERC721Burnable",
    path: `${pathPrefix}/ethereum/erc721/features/ERC721Burnable.sol`,
  });
}
