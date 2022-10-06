import type { ContractBuilder } from "../../../../utils/contract";
import { defineFunctions } from "../../../../utils/define-functions";
import { pathPrefix } from "../../../../utils/sourcecode";
import { ERC1155_SUPPLY_TRACKABLE } from "../../../path/erc1155-path";

export function addERC1155SupplyTrackable(c: ContractBuilder) {
  c.addParent(ERC1155_SUPPLY_TRACKABLE);
  c.addOverride(ERC1155_SUPPLY_TRACKABLE.name, functions._beforeTokenTransfer);
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
