import { supportsInterface } from "../../../../utils/common-functions";
import type { ContractBuilder } from "../../../../utils/contract";
import { defineFunctions } from "../../../../utils/define-functions";
import { pathPrefix } from "../../../../utils/sourcecode";
import { ERC721_DEFAULT } from "../../../path/erc721-path";

export function addERC721Base(
  c: ContractBuilder,
  name: string,
  symbol: string
) {
  c.addParent(ERC721_DEFAULT, [name, symbol]);

  c.addOverride(ERC721_DEFAULT.name, functions._beforeTokenTransfer);
  c.addOverride(ERC721_DEFAULT.name, functions._afterTokenTransfer);
  c.addOverride(ERC721_DEFAULT.name, functions._burn);
  c.addOverride(ERC721_DEFAULT.name, functions.tokenURI);
  c.addOverride(ERC721_DEFAULT.name, supportsInterface);
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

  _afterTokenTransfer: {
    kind: "internal" as const,
    args: [
      { name: "from", type: "address" },
      { name: "to", type: "address" },
      { name: "tokenId", type: "uint256" },
    ],
  },

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
