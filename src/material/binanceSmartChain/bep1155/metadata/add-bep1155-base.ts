import { supportsInterface } from "../../../../utils/common-functions";
import type { ContractBuilder } from "../../../../utils/contract";
import { defineFunctions } from "../../../../utils/define-functions";
import { pathPrefix } from "../../../../utils/sourcecode";

export function addBEP1155Base(c: ContractBuilder, uri: string) {
  c.addParent(
    {
      name: "BEP1155",
      path: `${pathPrefix}/binanceSmartChain/bep1155/BEP1155.sol`,
    },
    [uri]
  );

  c.addOverride("BEP1155", functions._beforeTokenTransfer);
  c.addOverride("BEP1155", supportsInterface);
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
