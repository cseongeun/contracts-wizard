import {
  CommonOptions,
  withCommonDefaults,
  defaults as commonDefaults,
} from "../../common-options";
import { Contract, ContractBuilder } from "../../contract";
import { printContract } from "../../print";
import { defineFunctions } from "../../../utils/define-functions";
import { setAccessControl } from "../../common/access/set-access-control";
import { setInformation } from "../../common/information/set-info";
import { addKIP7Burnable } from "./feature/add-kip7-burnable";
import { addKIP7Mintable } from "./feature/add-kip7-mintable";
import { addKIP7Pausable } from "./feature/add-kip7-pausable";
import { addKIP7Base } from "./metadata/add-kip7-base";
import { addKIP7Premintable } from "./metadata/add-kip7-premintable";
import { addKIP7Lockable } from "./feature/add-kip7-lockable";
import { addKIP7Freezable } from "./feature/add-kip7-freezable";

export interface KIP7Options extends CommonOptions {
  // metadata
  name: string;
  symbol: string;
  premint?: string;
  // feature
  burnable?: boolean;
  freezable?: boolean;
  lockable?: boolean;
  pausable?: boolean;
  mintable?: boolean;
}

export const defaults: Required<KIP7Options> = {
  // metadata
  name: "MyToken",
  symbol: "MTK",
  premint: "0",

  // feature
  burnable: false,
  freezable: false,
  lockable: false,
  pausable: false,
  mintable: false,

  // access
  access: commonDefaults.access,
  // info
  info: commonDefaults.info,
} as const;

function withDefaults(opts: KIP7Options): Required<KIP7Options> {
  return {
    ...opts,
    ...withCommonDefaults(opts),
    premint: opts.premint || defaults.premint,
    burnable: opts.burnable ?? defaults.burnable,
    freezable: opts.freezable ?? defaults.freezable,
    lockable: opts.lockable ?? defaults.lockable,
    pausable: opts.pausable ?? defaults.pausable,
    mintable: opts.mintable ?? defaults.mintable,
  };
}

export function printKIP7(opts: KIP7Options = defaults): string {
  return printContract(buildKIP7(opts));
}

export function isAccessControlRequired(opts: Partial<KIP7Options>): boolean {
  return (opts.mintable ||
    opts.pausable ||
    opts.freezable ||
    opts.lockable) as boolean;
}

export function buildKIP7(opts: KIP7Options): Contract {
  const allOpts = withDefaults(opts);

  const c = new ContractBuilder(allOpts.name);

  const { access, info } = allOpts;

  addKIP7Base(c, allOpts.name, allOpts.symbol);

  if (allOpts.premint) {
    addKIP7Premintable(c, allOpts.premint);
  }

  if (allOpts.burnable) {
    addKIP7Burnable(c);
  }

  if (allOpts.freezable) {
    addKIP7Freezable(c, access);
  }

  if (allOpts.pausable) {
    addKIP7Pausable(c, access, [functions._beforeTokenTransfer]);
  }

  if (allOpts.mintable) {
    addKIP7Mintable(c, access);
  }

  if (allOpts.lockable) {
    addKIP7Lockable(c, access);
  }

  setAccessControl(c, access);
  setInformation(c, info);

  return c;
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
});
