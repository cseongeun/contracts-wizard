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
import { addERC20Base } from "./metadata/add-erc20-base";
import { addERC20Premint } from "./metadata/add-erc20-premint";
import { addERC20Lockable } from "./feature/add-erc20-lockable";
import { addERC20Freezable } from "./feature/add-erc20-freezable";
import { addERC20Capped } from "./feature/add-erc20-capped";

export interface ERC20Options extends CommonOptions {
  // metadata
  name: string;
  symbol: string;
  premint?: string;
  capped?: string;

  // feature
  features: {
    burnable?: boolean;
    freezable?: boolean;
    lockable?: boolean;
    pausable?: boolean;
    mintable?: boolean;
  };
}

export const defaults: Required<ERC20Options> = {
  // metadata
  name: "MyToken",
  symbol: "MTK",
  premint: "0",
  capped: "0",

  // feature
  features: {
    burnable: false,
    freezable: false,
    lockable: false,
    pausable: false,
    mintable: false,
  },
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
    capped: opts.capped ?? defaults.capped,
    features: {
      burnable: opts.features.burnable ?? defaults.features.burnable,
      freezable: opts.features.freezable ?? defaults.features.freezable,
      lockable: opts.features.lockable ?? defaults.features.lockable,
      pausable: opts.features.pausable ?? defaults.features.pausable,
      mintable: opts.features.mintable ?? defaults.features.mintable,
    },
  };
}

export function printERC20(opts: ERC20Options = defaults): string {
  return printContract(buildERC20(opts));
}

export function isAccessControlRequired(opts: Partial<ERC20Options>): boolean {
  return (opts.features?.mintable ||
    opts.features?.pausable ||
    opts.features?.freezable ||
    opts.features?.lockable) as boolean;
}

export function buildERC20(opts: ERC20Options): Contract {
  const allOpts = withDefaults(opts);

  const c = new ContractBuilder(allOpts.name);

  const { access, info } = allOpts;

  addERC20Base(c, allOpts.name, allOpts.symbol);

  if (allOpts.capped) {
    addERC20Capped(c, allOpts.capped);
  }

  if (allOpts.premint) {
    addERC20Premint(c, allOpts.premint);
  }

  if (allOpts.features.burnable) {
    addERC20Burnable(c);
  }

  if (allOpts.features.freezable) {
    addERC20Freezable(c, access);
  }

  if (allOpts.features.pausable) {
    addERC20Pausable(c, access, [functions._beforeTokenTransfer]);
  }

  if (allOpts.features.mintable) {
    addERC20Mintable(c, access);
  }

  if (allOpts.features.lockable) {
    addERC20Lockable(c, access);
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
