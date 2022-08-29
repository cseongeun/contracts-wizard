import { supportsInterface } from "../../../common-functions";
import type { ContractBuilder } from "../../../contract";
import { defineFunctions } from "../../../../utils/define-functions";

export function addERC1155Base(c: ContractBuilder, uri: string) {
  c.addParent(
    {
      name: "ERC1155",
      path: "@hexlant/contracts/ethereum/erc1155/ERC1155.sol",
    },
    [uri]
  );

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
