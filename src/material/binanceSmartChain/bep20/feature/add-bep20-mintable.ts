import type { ContractBuilder } from "../../../../utils/contract";
import { defineFunctions } from "../../../../utils/define-functions";
import {
  Access,
  requireAccessControl,
} from "../../../common/access/set-access-control";

export function addBEP20Mintable(c: ContractBuilder, access: Access) {
  requireAccessControl(c, functions.mint, access, "MINTER");
  c.addFunctionCode("_mint(to, amount);", functions.mint);
}

const functions = defineFunctions({
  mint: {
    kind: "public" as const,
    args: [
      { name: "to", type: "address" },
      { name: "amount", type: "uint256" },
    ],
  },
});
