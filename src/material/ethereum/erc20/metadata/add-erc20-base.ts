import type { ContractBuilder } from "../../../contract";
import { defineFunctions } from "../../../../utils/define-functions";

export function addERC20Base(c: ContractBuilder, name: string, symbol: string) {
  c.addParent(
    {
      name: "ERC20",
      path: "@hexlant/contracts/ethereum/erc20/ERC20.sol",
    },
    [name, symbol]
  );

  c.addOverride("ERC20", functions._beforeTokenTransfer);
  c.addOverride("ERC20", functions._afterTokenTransfer);
  c.addOverride("ERC20", functions._mint);
  c.addOverride("ERC20", functions._burn);
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
