import { supportsInterface } from "../../../../utils/common-functions";
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

  c.addParent({
    name: "BEP20Feature",
    path: `${pathPrefix}/binanceSmartChain/bep20/BEP20Feature.sol`,
  });

  c.addOverride("BEP20", functions._beforeTokenTransfer);
  c.addOverride("BEP20", functions._afterTokenTransfer);
  c.addOverride("BEP20", functions._mint);
  c.addOverride("BEP20", functions._burn);
  c.addOverride("BEP20", functions.balanceOf);
  c.addOverride("BEP20", supportsInterface);
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
  balanceOf: {
    kind: "public" as const,
    mutability: "view",
    args: [{ name: "account", type: "address" }],
    returns: ["uint256"],
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
