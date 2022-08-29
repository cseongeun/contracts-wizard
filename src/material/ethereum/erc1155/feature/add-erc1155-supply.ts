import type { ContractBuilder } from "../../../contract";
import { defineFunctions } from "../../../../utils/define-functions";

export function addERC1155Supply(c: ContractBuilder) {
  c.addParent({
    name: "ERC1155Supply",
    path: "@hexlant/contracts/ethereum/erc1155/features/ERC1155Supply.sol",
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
