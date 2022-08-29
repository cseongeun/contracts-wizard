import type { ContractBuilder } from "../../../contract";
import { defineFunctions } from "../../../../utils/define-functions";
import { pathPrefix } from "../../../sourcecode";

export function addERC20Vote(c: ContractBuilder) {
  if (!c.parents.some((p) => p.contract.name === "ERC20Permit")) {
    throw new Error("Missing ERC20Permit requirement for ERC20Votes");
  }

  c.addParent({
    name: "ERC20Votes",
    path: `${pathPrefix}/token/erc20/features/ERC20Votes.sol`,
  });
  c.addOverride("ERC20Votes", functions._mint);
  c.addOverride("ERC20Votes", functions._burn);
  c.addOverride("ERC20Votes", functions._afterTokenTransfer);
}

const functions = defineFunctions({
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
