import type { ContractBuilder } from "../../../../utils/contract";
import { defineFunctions } from "../../../../utils/define-functions";
import { pathPrefix } from "../../../../utils/sourcecode";

export function addBEP1155Supply(c: ContractBuilder) {
  c.addParent({
    name: "BEP1155Supply",
    path: `${pathPrefix}/binanceSmartChain/bep1155/features/BEP1155Supply.sol`,
  });
  c.addOverride("BEP1155Supply", functions._beforeTokenTransfer);
}

const functions = defineFunctions({
  _beforeTokenTransfer: {
    kind: "internal" as const,
    args: [
      { name: "operator", type: "address" },
      { name: "from", type: "address" },
      { name: "to", type: "address" },
      { name: "ids", type: "uint256[] memory" },
      { name: "amounts", type: "uint256[] memory" },
      { name: "data", type: "bytes memory" },
    ],
  },
});
