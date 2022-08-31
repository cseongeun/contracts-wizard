import type { ContractBuilder } from "../../../../utils/contract";
import { defineFunctions } from "../../../../utils/define-functions";
import {
  Access,
  requireAccessControl,
} from "../../../common/access/set-access-control";
import { pathPrefix } from "../../../../utils/sourcecode";

export function addKIP7Snapshot(c: ContractBuilder, access: Access) {
  c.addParent({
    name: "KIP7Snapshot",
    path: `${pathPrefix}/klaytn/kip7/features/KIP7Snapshot.sol`,
  });

  c.addOverride("KIP7Snapshot", functions._beforeTokenTransfer);

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
