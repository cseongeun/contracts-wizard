import type { ContractBuilder, BaseFunction } from "../../../../utils/contract";
import { pathPrefix } from "../../../../utils/sourcecode";
import {
  Access,
  requireAccessControl,
} from "../../../common/access/set-access-control";
import { defineFunctions } from "../../../../utils/define-functions";

export function addKIP37Pausable(c: ContractBuilder, access: Access) {
  c.addParent({
    name: "KIP37Pausable",
    path: `${pathPrefix}/klaytn/kip37/features/KIP37Pausable.sol`,
  });

  c.addOverride("KIP37Pausable", functions._beforeTokenTransfer);

  requireAccessControl(c, functions.pause, access, "PAUSER");
  c.addFunctionCode("_pause();", functions.pause);

  requireAccessControl(c, functions.unpause, access, "PAUSER");
  c.addFunctionCode("_unpause();", functions.unpause);
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
  pause: {
    kind: "public" as const,
    args: [],
  },

  unpause: {
    kind: "public" as const,
    args: [],
  },
});
