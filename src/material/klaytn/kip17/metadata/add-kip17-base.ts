import { supportsInterface } from "../../../common-functions";
import type { ContractBuilder } from "../../../contract";
import { defineFunctions } from "../../../../utils/define-functions";
import { pathPrefix } from "../../../sourcecode";

export function addKIP17Base(c: ContractBuilder, name: string, symbol: string) {
  c.addParent(
    {
      name: "KIP17",
      path: `${pathPrefix}/klaytn/kip17/KIP17.sol`,
    },
    [name, symbol]
  );

  c.addOverride("KIP17", functions._beforeTokenTransfer);
  c.addOverride("KIP17", functions._afterTokenTransfer);
  c.addOverride("KIP17", functions._burn);
  c.addOverride("KIP17", functions.tokenURI);
  c.addOverride("KIP17", supportsInterface);
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

  _afterTokenTransfer: {
    kind: "internal" as const,
    args: [
      { name: "from", type: "address" },
      { name: "to", type: "address" },
      { name: "tokenId", type: "uint256" },
    ],
  },

  _burn: {
    kind: "internal" as const,
    args: [{ name: "tokenId", type: "uint256" }],
  },

  tokenURI: {
    kind: "public" as const,
    args: [{ name: "tokenId", type: "uint256" }],
    returns: ["string memory"],
    mutability: "view" as const,
  },
});
