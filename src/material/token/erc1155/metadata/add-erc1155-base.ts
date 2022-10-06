import { supportsInterface } from "../../../../utils/common-functions";
import type { ContractBuilder } from "../../../../utils/contract";
import { defineFunctions } from "../../../../utils/define-functions";
import { pathPrefix } from "../../../../utils/sourcecode";
import { ERC1155_DEFAULT } from "../../../path/erc1155-path";

export function addERC1155Base(c: ContractBuilder, uri: string) {
  c.addParent(ERC1155_DEFAULT, [uri]);

  c.addOverride(ERC1155_DEFAULT.name, functions._beforeTokenTransfer);
  c.addOverride(ERC1155_DEFAULT.name, supportsInterface);
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
