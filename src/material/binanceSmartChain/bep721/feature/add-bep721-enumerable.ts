import { supportsInterface } from "../../../../utils/common-functions";
import type { ContractBuilder } from "../../../../utils/contract";
import { defineFunctions } from "../../../../utils/define-functions";
import { pathPrefix } from "../../../../utils/sourcecode";

export function addBEP721Enumerable(c: ContractBuilder) {
  c.addParent({
    name: "BEP721Enumerable",
    path: `${pathPrefix}/binanceSmartChain/bep721/features/BEP721Enumerable.sol`,
  });

  c.addOverride("BEP721Enumerable", functions._beforeTokenTransfer);
  c.addOverride("BEP721Enumerable", supportsInterface);
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
