import { supportsInterface } from "../../../common-functions";
import type { ContractBuilder } from "../../../contract";
import { defineFunctions } from "../../../../utils/define-functions";
import { pathPrefix } from "../../../sourcecode";

export function addKIP17Enumerable(c: ContractBuilder) {
  c.addParent({
    name: "KIP17Enumerable",
    path: `${pathPrefix}/klaytn/kip17/features/KIP17Enumerable.sol`,
  });

  c.addOverride("KIP17Enumerable", functions._beforeTokenTransfer);
  c.addOverride("KIP17Enumerable", supportsInterface);
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
