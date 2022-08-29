import type { ContractBuilder } from "../../../contract";
import { defineFunctions } from "../../../../utils/define-functions";

export function addERC721URIStorage(c: ContractBuilder) {
  c.addParent({
    name: "ERC721URIStorage",
    path: "@hexlant/contracts/ethereum/erc721/features/ERC721URIStorage.sol",
  });

  c.addOverride("ERC721URIStorage", functions._burn);
  c.addOverride("ERC721URIStorage", functions.tokenURI);
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
