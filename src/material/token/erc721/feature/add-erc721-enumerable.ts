import { supportsInterface } from "../../../../utils/common-functions";
import type { ContractBuilder } from "../../../../utils/contract";
import { defineFunctions } from "../../../../utils/define-functions";
import { pathPrefix } from "../../../../utils/sourcecode";
import { ERC721_ENUMERABLE } from "../../../path/erc721-path";

export function addERC721Enumerable(c: ContractBuilder) {
  c.addParent(ERC721_ENUMERABLE);

  c.addOverride(ERC721_ENUMERABLE.name, functions._beforeTokenTransfer);
  c.addOverride(ERC721_ENUMERABLE.name, supportsInterface);
}

const functions = defineFunctions({
  _beforeTokenTransfer: {
    kind: "internal" as const,
    args: [
      { name: "from", type: "address" },
      { name: "to", type: "address" },
      { name: "tokenId", type: "uint256" },
    ],
  },
});
