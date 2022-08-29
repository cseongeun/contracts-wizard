import type { ContractBuilder } from "../../../contract";
import { defineFunctions } from "../../../../utils/define-functions";
import {
  Access,
  requireAccessControl,
} from "../../../common/access/set-access-control";

export function addKIP37Mintable(c: ContractBuilder, access: Access) {
  requireAccessControl(c, functions.mint, access, "MINTER");
  requireAccessControl(c, functions.mintBatch, access, "MINTER");
  c.addFunctionCode("_mint(account, id, amount, data);", functions.mint);
  c.addFunctionCode("_mintBatch(to, ids, amounts, data);", functions.mintBatch);
}

const functions = defineFunctions({
  mint: {
    kind: "public" as const,
    args: [
      { name: "account", type: "address" },
      { name: "id", type: "uint256" },
      { name: "amount", type: "uint256" },
      { name: "data", type: "bytes memory" },
    ],
  },

  mintBatch: {
    kind: "public" as const,
    args: [
      { name: "to", type: "address" },
      { name: "ids", type: "uint256[] memory" },
      { name: "amounts", type: "uint256[] memory" },
      { name: "data", type: "bytes memory" },
    ],
  },
});
