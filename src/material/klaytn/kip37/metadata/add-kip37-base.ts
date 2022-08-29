import { supportsInterface } from "../../../common-functions";
import type { ContractBuilder } from "../../../contract";
import { defineFunctions } from "../../../../utils/define-functions";
import { pathPrefix } from "../../../sourcecode";

export function addKIP37Base(c: ContractBuilder, uri: string) {
  c.addParent(
    {
      name: "KIP37",
      path: `${pathPrefix}/klaytn/kip37/KIP37.sol`,
    },
    [uri]
  );

  c.addOverride("KIP37", functions._beforeTokenTransfer);
  c.addOverride("KIP37", supportsInterface);
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
