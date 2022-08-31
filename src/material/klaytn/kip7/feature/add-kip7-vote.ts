import type { ContractBuilder } from "../../../../utils/contract";
import { defineFunctions } from "../../../../utils/define-functions";
import { pathPrefix } from "../../../../utils/sourcecode";

export function addKIP7Vote(c: ContractBuilder) {
  if (!c.parents.some((p) => p.contract.name === "KIP7Permit")) {
    throw new Error("Missing KIP7Permit requirement for KIP7Votes");
  }

  c.addParent({
    name: "KIP7Votes",
    path: `${pathPrefix}/klaytn/kip7/features/KIP7Votes.sol`,
  });
  c.addOverride("KIP7Votes", functions._mint);
  c.addOverride("KIP7Votes", functions._burn);
  c.addOverride("KIP7Votes", functions._afterTokenTransfer);
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
