import type { ContractBuilder } from "../../../contract";
import { defineFunctions } from "../../../../utils/define-functions";
import { pathPrefix } from "../../../sourcecode";

export function addKIP37Supply(c: ContractBuilder) {
  c.addParent({
    name: "KIP37Supply",
    path: `${pathPrefix}/klaytn/kip37/features/KIP37Supply.sol`,
  });
  c.addOverride("ERC1155Supply", functions._beforeTokenTransfer);
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
