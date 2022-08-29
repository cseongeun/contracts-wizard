import {
  CommonOptions,
  withCommonDefaults,
  defaults as commonDefaults,
} from "../../../utils/common-options";
import { Contract, ContractBuilder } from "../../../utils/contract";
import { printContract } from "../../../utils/print";
import { defineFunctions } from "../../../utils/define-functions";
import { setAccessControl } from "../../common/access/set-access-control";
import { setInformation } from "../../common/information/set-info";
import { addERC20Burnable } from "./feature/add-erc20-burnable";
import { addERC20Mintable } from "./feature/add-erc20-mintable";
import { addERC20Pausable } from "./feature/add-erc20-pausable";
import { addERC20Permit } from "./feature/add-erc20-permit";
import { addERC20Snapshot } from "./feature/add-erc20-snapshot";
import { addERC20Vote } from "./feature/add-erc20-vote";
import { addERC20Base } from "./metadata/add-erc20-base";
import { addERC20Premintable } from "./metadata/add-erc20-premintable";
import { addERC20Lockable } from "./feature/add-erc20-lockable";
import { addERC20Freezable } from "./feature/add-erc20-freezable";

export interface ERC20Options extends CommonOptions {
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
  snapshot?: boolean;
  vote?: boolean;
  permit?: boolean;
}

export const defaults: Required<ERC20Options> = {
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
  permit: false,
  snapshot: false,
  vote: false,

  // access
  access: commonDefaults.access,
  // info
  info: commonDefaults.info,
} as const;

function withDefaults(opts: ERC20Options): Required<ERC20Options> {
  return {
    ...opts,
    ...withCommonDefaults(opts),
    premint: opts.premint || defaults.premint,
    burnable: opts.burnable ?? defaults.burnable,
    freezable: opts.freezable ?? defaults.freezable,
    lockable: opts.lockable ?? defaults.lockable,
    pausable: opts.pausable ?? defaults.pausable,
    mintable: opts.mintable ?? defaults.mintable,
    permit: opts.permit ?? defaults.permit,
    snapshot: opts.snapshot ?? defaults.snapshot,
    vote: opts.vote ?? defaults.vote,
  };
}

export function printERC20(opts: ERC20Options = defaults): string {
  return printContract(buildERC20(opts));
}

export function isAccessControlRequired(opts: Partial<ERC20Options>): boolean {
  return (opts.mintable ||
    opts.pausable ||
    opts.snapshot ||
    opts.freezable ||
    opts.lockable) as boolean;
}

export function buildERC20(opts: ERC20Options): Contract {
  const allOpts = withDefaults(opts);

  const c = new ContractBuilder(allOpts.name);

  const { access, info } = allOpts;

  addERC20Base(c, allOpts.name, allOpts.symbol);

  if (allOpts.premint) {
    addERC20Premintable(c, allOpts.premint);
  }

  if (allOpts.burnable) {
    addERC20Burnable(c);
  }

  if (allOpts.freezable) {
    addERC20Freezable(c, access);
  }

  if (allOpts.snapshot) {
    addERC20Snapshot(c, access);
  }

  if (allOpts.pausable) {
    addERC20Pausable(c, access, [functions._beforeTokenTransfer]);
  }

  if (allOpts.mintable) {
    addERC20Mintable(c, access);
  }

  if (allOpts.lockable) {
    addERC20Lockable(c, access);
  }

  // // Note: Votes requires Permit
  if (allOpts.permit || allOpts.vote) {
    addERC20Permit(c, allOpts.name);
  }

  if (allOpts.vote) {
    addERC20Vote(c);
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
