import {
  CommonOptions,
  withCommonDefaults,
  defaults as commonDefaults,
} from "../../../utils/common-options";
import { Contract, ContractBuilder } from "../../../utils/contract";
import { printContract } from "../../../utils/print";
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
import { addKIP7BatchTransferable } from "./feature/add-kip7-batchTransferable";
import {
  Access,
  ERC20TypeFeatureType,
  setAccess,
  setFeatures,
} from "../../common/feature/set-features";

export interface KIP7Options extends CommonOptions {
  metadata: {
    name: string;
    symbol: string;
    premint?: string;
    premintAddress?: string;
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

export const defaults: Required<KIP7Options> = {
  metadata: {
    name: "MyToken",
    symbol: "MTK",
    premint: "0",
    premintAddress: "msg.sender",
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

function withDefaults(opts: KIP7Options): Required<KIP7Options> {
  return {
    metadata: {
      name: opts.metadata.name || defaults.metadata.name,
      symbol: opts.metadata.symbol || defaults.metadata.symbol,
      premint: opts.metadata.premint || defaults.metadata.premint,
      premintAddress:
        opts.metadata.premintAddress ?? defaults.metadata.premintAddress,
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
  const features = [];

  addKIP7Base(c, allOpts.metadata.name, allOpts.metadata.symbol);

  if (allOpts.metadata.capped && allOpts.metadata.capped != "0") {
    features.push([ERC20TypeFeatureType.CAPPED]);
    addKIP7Capped(c, allOpts.metadata.capped);
  }

  if (allOpts.metadata.premint && allOpts.metadata.premint != "0") {
    if (allOpts.metadata.capped != "0") {
      if (
        parseInt(allOpts.metadata.premint) >
        parseInt(allOpts.metadata.capped as string)
      ) {
        addKIP7Premint(
          c,
          allOpts.metadata.capped as string,
          allOpts.metadata.premintAddress as string
        );
      } else {
        addKIP7Premint(
          c,
          allOpts.metadata.premint,
          allOpts.metadata.premintAddress as string
        );
      }
    } else {
      addKIP7Premint(
        c,
        allOpts.metadata.premint,
        allOpts.metadata.premintAddress as string
      );
    }
  }

  if (allOpts.features.burnable) {
    features.push([ERC20TypeFeatureType.BURNABLE]);
    addKIP7Burnable(c);
  }

  if (allOpts.features.freezable) {
    features.push([ERC20TypeFeatureType.FREEZABLE]);
    addKIP7Freezable(c, access);
  }

  if (allOpts.features.pausable) {
    features.push([ERC20TypeFeatureType.PAUSABLE]);
    addKIP7Pausable(c, access);
  }

  if (allOpts.features.mintable) {
    features.push([ERC20TypeFeatureType.MINTABLE]);
    addKIP7Mintable(c, access);
  }

  if (allOpts.features.lockable) {
    features.push([ERC20TypeFeatureType.LOCKABLE]);
    addKIP7Lockable(c, access);
  }

  if (allOpts.features.batchTransferable) {
    features.push([ERC20TypeFeatureType.BATCH_TRANSFERABLE]);
    addKIP7BatchTransferable(c);
  }

  setAccessControl(c, access);
  setInformation(c, info);

  setFeatures(c, features);
  setAccess(
    c,
    !access ? Access.NONE : access == "ownable" ? Access.OWNABLE : Access.ROLES
  );
  return c;
}
