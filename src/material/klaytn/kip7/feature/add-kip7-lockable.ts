import type { ContractBuilder, BaseFunction } from "../../../../utils/contract";
import {
  Access,
  requireAccessControl,
} from "../../../common/access/set-access-control";
import { defineFunctions } from "../../../../utils/define-functions";
import { pathPrefix } from "../../../../utils/sourcecode";

export function addKIP7Lockable(c: ContractBuilder, access: Access) {
  c.addParent({
    name: "KIP7Lockable",
    path: `${pathPrefix}/klaytn/kip7/features/KIP7Lockable.sol`,
  });

  c.addOverride("KIP7Lockable", functions._beforeTokenTransfer);

  requireAccessControl(c, functions.lock, access, "LOCKER");
  c.addFunctionCode("_lock(account, amount, reason, release);", functions.lock);

  requireAccessControl(c, functions.transferWithLock, access, "LOCKER");
  c.addFunctionCode(
    "_transferWithLock(account, amount, reason, release);",
    functions.transferWithLock
  );

  requireAccessControl(c, functions.extendLock, access, "LOCKER");
  c.addFunctionCode(
    "_extendLock(account, reason, time);",
    functions.extendLock
  );

  requireAccessControl(c, functions.increaseLockAmount, access, "LOCKER");
  c.addFunctionCode(
    "_increaseLockAmount(account, reason, amount);",
    functions.increaseLockAmount
  );

  requireAccessControl(c, functions.unlock, access, "LOCKER");
  c.addFunctionCode("_unlock(account);", functions.unlock);
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

  lock: {
    kind: "public" as const,
    args: [
      { name: "account", type: "address" },
      { name: "amount", type: "uint256" },
      { name: "reason", type: "bytes32" },
      { name: "release", type: "uint256" },
    ],
  },
  transferWithLock: {
    kind: "public" as const,
    args: [
      { name: "account", type: "address" },
      { name: "amount", type: "uint256" },
      { name: "reason", type: "bytes32" },
      { name: "release", type: "uint256" },
    ],
  },
  extendLock: {
    kind: "public" as const,
    args: [
      { name: "account", type: "address" },
      { name: "reason", type: "bytes32" },
      { name: "time", type: "uint256" },
    ],
  },
  increaseLockAmount: {
    kind: "public" as const,
    args: [
      { name: "account", type: "address" },
      { name: "reason", type: "bytes32" },
      { name: "amount", type: "uint256" },
    ],
  },
  unlock: {
    kind: "public" as const,
    args: [{ name: "account", type: "address" }],
  },
});
