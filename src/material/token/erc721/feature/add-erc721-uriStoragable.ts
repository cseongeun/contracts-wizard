import type { ContractBuilder } from "../../../../utils/contract";
import { defineFunctions } from "../../../../utils/define-functions";
import { pathPrefix } from "../../../../utils/sourcecode";
import { ERC721_URI_STORAGABLE } from "../../../path/erc721-path";

export function addERC721URIStoragable(c: ContractBuilder) {
  c.addParent(ERC721_URI_STORAGABLE);

  c.addOverride(ERC721_URI_STORAGABLE.name, functions._burn);
  c.addOverride(ERC721_URI_STORAGABLE.name, functions.tokenURI);
}

const functions = defineFunctions({
  _burn: {
    kind: "internal" as const,
    args: [{ name: "tokenId", type: "uint256" }],
  },
  tokenURI: {
    kind: "public" as const,
    args: [{ name: "tokenId", type: "uint256" }],
    returns: ["string memory"],
    mutability: "view" as const,
  },
});
