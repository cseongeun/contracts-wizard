import type { ContractBuilder, BaseFunction } from "../../../../utils/contract";
import {
  Access,
  requireAccessControl,
} from "../../../common/access/set-access-control";
import { defineFunctions } from "../../../../utils/define-functions";
import { pathPrefix } from "../../../../utils/sourcecode";

export function addBEP20Lockable(c: ContractBuilder, access: Access) {
  c.addParent({
    name: "BEP20Lockable",
    path: `${pathPrefix}/binanceSmartChain/bep20/features/BEP20Lockable.sol`,
  });

  c.addOverride("BEP20Lockable", functions._beforeTokenTransfer);

  requireAccessControl(c, functions.lock, access, "LOCKER");
  c.addFunctionCode("_lock(account, amount, reason, release);", functions.lock);

  requireAccessControl(c, functions.batchLock, access, "LOCKER");
  c.addFunctionCode(
    "_batchLock(accounts, amounts, reasons, releases);",
    functions.batchLock
  );

  requireAccessControl(c, functions.transferWithLock, access, "LOCKER");
  c.addFunctionCode(
    "_transferWithLock(account, amount, reason, release);",
    functions.transferWithLock
  );

  requireAccessControl(c, functions.batchTransferWithLock, access, "LOCKER");
  c.addFunctionCode(
    "_batchTransferWithLock(accounts, amounts, reasons, releases);",
    functions.batchTransferWithLock
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
  batchLock: {
    kind: "public" as const,
    args: [
      { name: "accounts", type: "address[] calldata" },
      { name: "amounts", type: "uint256[] calldata" },
      { name: "reasons", type: "bytes32[] calldata" },
      { name: "releases", type: "uint256[] calldata" },
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
  batchTransferWithLock: {
    kind: "public" as const,
    args: [
      { name: "accounts", type: "address[] calldata" },
      { name: "amounts", type: "uint256[] calldata" },
      { name: "reasons", type: "bytes32[] calldata" },
      { name: "releases", type: "uint256[] calldata" },
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
