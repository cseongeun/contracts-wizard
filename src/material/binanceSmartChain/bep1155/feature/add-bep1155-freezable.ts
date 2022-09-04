import type { ContractBuilder, BaseFunction } from "../../../../utils/contract";
import { defineFunctions } from "../../../../utils/define-functions";
import {
  Access,
  requireAccessControl,
} from "../../../common/access/set-access-control";
import { pathPrefix } from "../../../../utils/sourcecode";

export function addBEP1155Freezable(c: ContractBuilder, access: Access) {
  c.addParent({
    name: "BEP1155Freezable",
    path: `${pathPrefix}/binanceSmartChain/bep1155/features/BEP1155Freezable.sol`,
  });

  c.addOverride("BEP1155Freezable", functions._beforeTokenTransfer);

  requireAccessControl(c, functions.freeze, access, "FREEZER");
  c.addFunctionCode("_freeze();", functions.freeze);

  requireAccessControl(c, functions.unfreeze, access, "FREEZER");
  c.addFunctionCode("_unfreeze();", functions.unfreeze);
}

const functions = defineFunctions({
  _beforeTokenTransfer: {
    kind: "internal" as const,
    args: [
      { name: "operator", type: "address" },
      { name: "from", type: "address" },
      { name: "to", type: "address" },
      { name: "ids", type: "uint256[] memory" },
      { name: "amounts", type: "uint256[] memory" },
      { name: "data", type: "bytes memory" },
    ],
  },
  freeze: {
    kind: "public" as const,
    args: [{ name: "account", type: "address" }],
  },

  unfreeze: {
    kind: "public" as const,
    args: [{ name: "account", type: "address" }],
  },
});
