import type { ContractBuilder } from "../../../contract";
import { defineFunctions } from "../../../../utils/define-functions";
import { pathPrefix } from "../../../sourcecode";

export function addKIP7Base(c: ContractBuilder, name: string, symbol: string) {
  c.addParent(
    {
      name: "KIP7",
      path: `${pathPrefix}/klaytn/kip7/KIP7.sol`,
    },
    [name, symbol]
  );

  c.addOverride("KIP7", functions._beforeTokenTransfer);
  c.addOverride("KIP7", functions._afterTokenTransfer);
  c.addOverride("KIP7", functions._mint);
  c.addOverride("KIP7", functions._burn);
}

const functions = defineFunctions({
  _beforeTokenTransfer: {
    kind: "internal" as const,
    args: [
      { name: "from", type: "address" },
      { name: "to", type: "address" },
      { name: "amount", type: "uint256" },
    ],
  },

  _afterTokenTransfer: {
    kind: "internal" as const,
    args: [
      { name: "from", type: "address" },
      { name: "to", type: "address" },
      { name: "amount", type: "uint256" },
    ],
  },

  _burn: {
    kind: "internal" as const,
    args: [
      { name: "account", type: "address" },
      { name: "amount", type: "uint256" },
    ],
  },

  _mint: {
    kind: "internal" as const,
    args: [
      { name: "to", type: "address" },
      { name: "amount", type: "uint256" },
    ],
  },
});
