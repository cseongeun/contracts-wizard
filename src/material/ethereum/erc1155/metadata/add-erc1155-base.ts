import { supportsInterface } from "../../../../utils/common-functions";
import type { ContractBuilder } from "../../../../utils/contract";
import { defineFunctions } from "../../../../utils/define-functions";
import { pathPrefix } from "../../../../utils/sourcecode";

export function addERC1155Base(c: ContractBuilder, uri: string) {
  c.addParent(
    {
      name: "ERC1155",
      path: `${pathPrefix}/ethereum/erc1155/ERC1155.sol`,
    },
    [uri]
  );

  c.addParent({
    name: "ERC1155Feature",
    path: `${pathPrefix}/ethereum/erc1155/ERC1155Feature.sol`,
  });

  c.addOverride("ERC1155", functions._beforeTokenTransfer);
  c.addOverride("ERC1155", supportsInterface);
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
