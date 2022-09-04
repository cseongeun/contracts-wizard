import type { ContractBuilder } from "../../../../utils/contract";
import { defineFunctions } from "../../../../utils/define-functions";
import { pathPrefix } from "../../../../utils/sourcecode";

export function addBEP721URIStorage(c: ContractBuilder) {
  c.addParent({
    name: "BEP721URIStorage",
    path: `${pathPrefix}/binanceSmartChain/bep721/features/BEP721URIStorage.sol`,
  });

  c.addOverride("BEP721URIStorage", functions._burn);
  c.addOverride("BEP721URIStorage", functions.tokenURI);
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
