import { supportsInterface } from "../../../../utils/common-functions";
import type { ContractBuilder } from "../../../../utils/contract";
import { defineFunctions } from "../../../../utils/define-functions";
import { pathPrefix } from "../../../../utils/sourcecode";

export function addERC721Base(
  c: ContractBuilder,
  name: string,
  symbol: string
) {
  c.addParent(
    {
      name: "ERC721",
      path: `${pathPrefix}/ethereum/erc721/ERC721.sol`,
    },
    [name, symbol]
  );

  c.addOverride("ERC721", functions._beforeTokenTransfer);
  c.addOverride("ERC721", functions._afterTokenTransfer);
  c.addOverride("ERC721", functions._burn);
  c.addOverride("ERC721", functions.tokenURI);
  c.addOverride("ERC721", supportsInterface);
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
