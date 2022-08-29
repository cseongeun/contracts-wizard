import { supportsInterface } from "../../../common-functions";
import type { ContractBuilder } from "../../../contract";
import { defineFunctions } from "../../../../utils/define-functions";

export function addERC721Enumerable(c: ContractBuilder) {
  c.addParent({
    name: "ERC721Enumerable",
    path: "@hexlant/contracts/ethereum/erc721/features/ERC721Enumerable.sol",
  });

  c.addOverride("ERC721Enumerable", functions._beforeTokenTransfer);
  c.addOverride("ERC721Enumerable", supportsInterface);
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
