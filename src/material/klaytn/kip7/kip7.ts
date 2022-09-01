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
import { addKIP7Burnable } from "./feature/add-kip7-burnable";
import { addKIP7Mintable } from "./feature/add-kip7-mintable";
import { addKIP7Pausable } from "./feature/add-kip7-pausable";
import { addKIP7Base } from "./metadata/add-kip7-base";
import { addKIP7Premint } from "./metadata/add-kip7-premint";
import { addKIP7Lockable } from "./feature/add-kip7-lockable";
import { addKIP7Freezable } from "./feature/add-kip7-freezable";
import { addKIP7Capped } from "./feature/add-kip7-capped";

export interface KIP7Options extends CommonOptions {
  metadata: {
    name: string;
    symbol: string;
    premint?: string;
    capped?: string;
  };
  features: {
    burnable?: boolean;
    freezable?: boolean;
    lockable?: boolean;
    pausable?: boolean;
    mintable?: boolean;
  };
}

export const defaults: Required<KIP7Options> = {
  metadata: {
    name: "MyToken",
    symbol: "MTK",
    premint: "0",
    capped: "0",
  },
  features: {
    burnable: false,
    freezable: false,
    lockable: false,
    pausable: false,
    mintable: false,
  },
  access: commonDefaults.access,
  info: commonDefaults.info,
} as const;

function withDefaults(opts: KIP7Options): Required<KIP7Options> {
  return {
    metadata: {
      name: opts.metadata.name || defaults.metadata.name,
      symbol: opts.metadata.symbol || defaults.metadata.symbol,
      premint: opts.metadata.premint || defaults.metadata.premint,
      capped: opts.metadata.capped ?? defaults.metadata.capped,
    },
    features: {
      burnable: opts.features.burnable ?? defaults.features.burnable,
      freezable: opts.features.freezable ?? defaults.features.freezable,
      lockable: opts.features.lockable ?? defaults.features.lockable,
      pausable: opts.features.pausable ?? defaults.features.pausable,
      mintable: opts.features.mintable ?? defaults.features.mintable,
    },
    ...withCommonDefaults(opts),
  };
}

export function printKIP7(opts: KIP7Options = defaults): string {
  return printContract(buildKIP7(opts));
}

export function isAccessControlRequired(opts: Partial<KIP7Options>): boolean {
  return (opts.features?.mintable ||
    opts.features?.pausable ||
    opts.features?.freezable ||
    opts.features?.lockable) as boolean;
}

export function buildKIP7(opts: KIP7Options): Contract {
  const allOpts = withDefaults(opts);

  const c = new ContractBuilder(allOpts.metadata.name);

  const { access, info } = allOpts;

  addKIP7Base(c, allOpts.metadata.name, allOpts.metadata.symbol);

  if (allOpts.metadata.capped) {
    addKIP7Capped(c, allOpts.metadata.capped);
  }

  if (allOpts.metadata.premint) {
    if (allOpts.metadata.capped) {
      if (allOpts.metadata.premint > allOpts.metadata.capped) {
        addKIP7Premint(c, allOpts.metadata.capped);
      } else {
        addKIP7Premint(c, allOpts.metadata.premint);
      }
    } else {
      addKIP7Premint(c, allOpts.metadata.premint);
    }
  }

  if (allOpts.features.burnable) {
    addKIP7Burnable(c);
  }

  if (allOpts.features.freezable) {
    addKIP7Freezable(c, access);
  }

  if (allOpts.features.pausable) {
    addKIP7Pausable(c, access);
  }

  if (allOpts.features.mintable) {
    addKIP7Mintable(c, access);
  }

  if (allOpts.features.lockable) {
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
