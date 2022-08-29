import type { ContractBuilder } from "../../../contract";
import { defineFunctions } from "../../../../utils/define-functions";
import {
  Access,
  requireAccessControl,
} from "../../../common/access/set-access-control";
import { pathPrefix } from "../../../sourcecode";

export function addERC20Snapshot(c: ContractBuilder, access: Access) {
  c.addParent({
    name: "ERC20Snapshot",
    path: `${pathPrefix}/ethereum/erc20/features/ERC20Snapshot.sol`,
  });

  c.addOverride("ERC20Snapshot", functions._beforeTokenTransfer);

  requireAccessControl(c, functions.snapshot, access, "SNAPSHOT");
  c.addFunctionCode("_snapshot();", functions.snapshot);
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
  snapshot: {
    kind: "public" as const,
    args: [],
  },
});
