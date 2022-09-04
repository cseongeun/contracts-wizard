import type { ContractBuilder } from "../../../../utils/contract";
import { defineFunctions } from "../../../../utils/define-functions";
import { pathPrefix } from "../../../../utils/sourcecode";

export function addBEP20Base(c: ContractBuilder, name: string, symbol: string) {
  c.addParent(
    {
      name: "BEP20",
      path: `${pathPrefix}/binanceSmartChain/bep20/BEP20.sol`,
    },
    [name, symbol]
  );

  c.addOverride("BEP20", functions._beforeTokenTransfer);
  c.addOverride("BEP20", functions._afterTokenTransfer);
  c.addOverride("BEP20", functions._mint);
  c.addOverride("BEP20", functions._burn);
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
