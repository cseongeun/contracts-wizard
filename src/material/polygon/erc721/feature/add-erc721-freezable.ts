import type { ContractBuilder, BaseFunction } from "../../../../utils/contract";
import { defineFunctions } from "../../../../utils/define-functions";
import {
  Access,
  requireAccessControl,
} from "../../../common/access/set-access-control";
import { pathPrefix } from "../../../../utils/sourcecode";

export function addERC721Freezable(c: ContractBuilder, access: Access) {
  c.addParent({
    name: "ERC721Freezable",
    path: `${pathPrefix}/polygon/erc721/features/ERC721Freezable.sol`,
  });

  c.addOverride("ERC721Freezable", functions._beforeTokenTransfer);

  requireAccessControl(c, functions.freeze, access, "FREEZER");
  c.addFunctionCode("_freeze();", functions.freeze);

  requireAccessControl(c, functions.unfreeze, access, "FREEZER");
  c.addFunctionCode("_unfreeze();", functions.unfreeze);
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
  freeze: {
    kind: "public" as const,
    args: [{ name: "account", type: "address" }],
  },

  unfreeze: {
    kind: "public" as const,
    args: [{ name: "account", type: "address" }],
  },
});
