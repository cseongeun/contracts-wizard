import type { ContractBuilder } from "../../../../utils/contract";
import { defineFunctions } from "../../../../utils/define-functions";
import { pathPrefix } from "../../../../utils/sourcecode";

export function addKIP17URIStorage(c: ContractBuilder) {
  c.addParent({
    name: "KIP17URIStorage",
    path: `${pathPrefix}/klaytn/kip17/features/KIP17URIStorage.sol`,
  });

  c.addOverride("KIP17URIStorage", functions._burn);
  c.addOverride("KIP17URIStorage", functions.tokenURI);
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
