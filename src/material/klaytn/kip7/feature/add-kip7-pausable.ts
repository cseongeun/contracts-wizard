import type { ContractBuilder, BaseFunction } from "../../../../utils/contract";
import {
  Access,
  requireAccessControl,
} from "../../../common/access/set-access-control";
import { defineFunctions } from "../../../../utils/define-functions";
import { pathPrefix } from "../../../../utils/sourcecode";

export function addKIP7Pausable(
  c: ContractBuilder,
  access: Access,
  pausableFns: BaseFunction[]
) {
  c.addParent({
    name: "KIP7Pausable",
    path: `${pathPrefix}/klaytn/kip7/features/KIP7Pausable.sol`,
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
