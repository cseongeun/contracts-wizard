import {
  CommonOptions,
  withCommonDefaults,
  defaults as commonDefaults,
} from "../../../utils/common-options";
import { Contract, ContractBuilder } from "../../../utils/contract";
import { printContract } from "../../../utils/print";
import { setAccessControl } from "../../common/access/set-access-control";
import { setInformation } from "../../common/information/set-info";
import { addBEP20Burnable } from "./feature/add-bep20-burnable";
import { addBEP20Mintable } from "./feature/add-bep20-mintable";
import { addBEP20Pausable } from "./feature/add-bep20-pausable";
import { addBEP20Base } from "./metadata/add-bep20-base";
import { addBEP20Premint } from "./metadata/add-bep20-premint";
import { addBEP20Lockable } from "./feature/add-bep20-lockable";
import { addBEP20Freezable } from "./feature/add-bep20-freezable";
import { addBEP20Capped } from "./feature/add-bep20-capped";
import { addBEP20BatchTransferable } from "./feature/add-bep20-batchTransferable";
import {
  Access,
  setAccess,
  setFeatures,
} from "../../common/feature/set-features";

enum FeatureType {
  CAPPED = "CAPPED",
  BURNABLE = "BURNABLE",
  FREEZABLE = "FREEZABLE",
  PAUSABLE = "PAUSABLE",
  MINTABLE = "MINTABLE",
  LOCKABLE = "LOCKABLE",
  BATCH_TRANSFERABLE = "BATCH_TRANSFERABLE",
}

export interface BEP20Options extends CommonOptions {
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
    batchTransferable: boolean;
  };
}

export const defaults: Required<BEP20Options> = {
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
    batchTransferable: false,
  },
  access: commonDefaults.access,
  info: commonDefaults.info,
} as const;

function withDefaults(opts: BEP20Options): Required<BEP20Options> {
  return {
    metadata: {
      name: opts.metadata.name ?? defaults.metadata.name,
      symbol: opts.metadata.symbol ?? defaults.metadata.symbol,
      premint: opts.metadata.premint ?? defaults.metadata.premint,
      capped: opts.metadata.capped ?? defaults.metadata.capped,
    },
    features: {
      burnable: opts.features.burnable ?? defaults.features.burnable,
      freezable: opts.features.freezable ?? defaults.features.freezable,
      lockable: opts.features.lockable ?? defaults.features.lockable,
      pausable: opts.features.pausable ?? defaults.features.pausable,
      mintable: opts.features.mintable ?? defaults.features.mintable,
      batchTransferable:
        opts.features.batchTransferable ?? defaults.features.batchTransferable,
    },
    ...withCommonDefaults(opts),
  };
}

export function printBEP20(opts: BEP20Options = defaults): string {
  return printContract(buildBEP20(opts));
}

export function isAccessControlRequired(opts: Partial<BEP20Options>): boolean {
  return (opts.features?.mintable ||
    opts.features?.pausable ||
    opts.features?.freezable ||
    opts.features?.lockable) as boolean;
}

export function buildBEP20(opts: BEP20Options): Contract {
  const allOpts = withDefaults(opts);

  const c = new ContractBuilder(allOpts.metadata.name);

  const { access, info } = allOpts;
  const features = [];

  addBEP20Base(c, allOpts.metadata.name, allOpts.metadata.symbol);

  if (allOpts.metadata.capped && allOpts.metadata.capped != "0") {
    features.push([CAPPED]);
    addBEP20Capped(c, allOpts.metadata.capped);
  }

  if (allOpts.metadata.premint && allOpts.metadata.premint != "0") {
    if (allOpts.metadata.capped != "0") {
      if (
        parseInt(allOpts.metadata.premint) >
        parseInt(allOpts.metadata.capped as string)
      ) {
        addBEP20Premint(c, allOpts.metadata.capped as string);
      } else {
        addBEP20Premint(c, allOpts.metadata.premint);
      }
    } else {
      addBEP20Premint(c, allOpts.metadata.premint);
    }
  }

  if (allOpts.features.burnable) {
    features.push([BURNABLE]);
    addBEP20Burnable(c);
  }

  if (allOpts.features.freezable) {
    features.push([FREEZABLE]);
    addBEP20Freezable(c, access);
  }

  if (allOpts.features.pausable) {
    features.push([PAUSABLE]);
    addBEP20Pausable(c, access);
  }

  if (allOpts.features.mintable) {
    features.push([MINTABLE]);
    addBEP20Mintable(c, access);
  }

  if (allOpts.features.lockable) {
    features.push([LOCKABLE]);
    addBEP20Lockable(c, access);
  }

  if (allOpts.features.batchTransferable) {
    features.push([BATCH_TRANSFERABLE]);
    addBEP20BatchTransferable(c);
  }

  setAccessControl(c, access);
  setInformation(c, info);

  setAccess(
    c,
    !access ? Access.NONE : access == "ownable" ? Access.OWNABLE : Access.ROLES
  );
  setFeatures(c, features);

  return c;
}
