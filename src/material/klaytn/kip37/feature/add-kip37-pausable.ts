import type { ContractBuilder, BaseFunction } from "../../../../utils/contract";
import { pathPrefix } from "../../../../utils/sourcecode";
import {
  Access,
  requireAccessControl,
} from "../../../common/access/set-access-control";
import { defineFunctions } from "../../../../utils/define-functions";

export function addKIP37Pausable(
  c: ContractBuilder,
  access: Access,
  pausableFns: BaseFunction[]
) {
  c.addParent({
    name: "KIP37Pausable",
    path: `${pathPrefix}/klaytn/kip37/features/KIP37Pausable.sol`,
  });

  for (const fn of pausableFns) {
    c.addModifier("whenNotPaused", fn);
  }

  requireAccessControl(c, functions.pause, access, "PAUSER");
  c.addFunctionCode("_pause();", functions.pause);

  requireAccessControl(c, functions.unpause, access, "PAUSER");
  c.addFunctionCode("_unpause();", functions.unpause);
}

const functions = defineFunctions({
  pause: {
    kind: "public" as const,
    args: [],
  },

  unpause: {
    kind: "public" as const,
    args: [],
  },
});
