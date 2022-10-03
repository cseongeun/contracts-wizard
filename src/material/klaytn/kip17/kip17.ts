import {
  CommonOptions,
  withCommonDefaults,
  defaults as commonDefaults,
} from "../../../utils/common-options";
import { Contract, ContractBuilder } from "../../../utils/contract";
import { printContract } from "../../../utils/print";
import { setAccessControl } from "../../common/access/set-access-control";
import { setAccess, setFeatures } from "../../common/feature/set-features";
import { setInformation } from "../../common/information/set-info";
import { addKIP17Burnable } from "./feature/add-kip17-burnable";
import { addKIP17Enumerable } from "./feature/add-kip17-enumerable";
import { addKIP17Freezable } from "./feature/add-kip17-freezable";
import { addKIP17Mintable } from "./feature/add-kip17-mintable";
import { addKIP17Pausable } from "./feature/add-kip17-pausable";
import { addKIP17URIStorage } from "./feature/add-kip17-uriStorage";
import { addKIP17Base } from "./metadata/add-kip17-base";
import { addKIP17BaseURI } from "./metadata/add-kip17-baseURI";

export interface KIP17Options extends CommonOptions {
  metadata: {
    name: string;
    symbol: string;
    baseUri?: string;
  };
  features: {
    enumerable?: boolean;
    uriStorage?: boolean;
    burnable?: boolean;
    pausable?: boolean;
    mintable?: boolean;
    autoIncrementId?: boolean;
    freezable?: boolean;
  };
}

export const defaults: Required<KIP17Options> = {
  metadata: {
    name: "MyToken",
    symbol: "MTK",
    baseUri: "",
  },
  features: {
    enumerable: false,
    uriStorage: false,
    burnable: false,
    pausable: false,
    mintable: false,
    autoIncrementId: false,
    freezable: false,
  },
  access: commonDefaults.access,
  info: commonDefaults.info,
} as const;

function withDefaults(opts: KIP17Options): Required<KIP17Options> {
  return {
    metadata: {
      name: opts.metadata.name ?? defaults.metadata.name,
      symbol: opts.metadata.symbol ?? defaults.metadata.symbol,
      baseUri: opts.metadata.baseUri ?? defaults.metadata.baseUri,
    },
    features: {
      enumerable: opts.features.enumerable ?? defaults.features.enumerable,
      uriStorage: opts.features.uriStorage ?? defaults.features.uriStorage,
      burnable: opts.features.burnable ?? defaults.features.burnable,
      pausable: opts.features.pausable ?? defaults.features.pausable,
      mintable: opts.features.mintable ?? defaults.features.mintable,
      autoIncrementId:
        opts.features.autoIncrementId ?? defaults.features.autoIncrementId,
      freezable: opts.features.freezable ?? defaults.features.freezable,
    },
    ...withCommonDefaults(opts),
  };
}

export function printKIP17(opts: KIP17Options = defaults): string {
  return printContract(buildKIP17(opts));
}

export function isAccessControlRequired(opts: Partial<KIP17Options>): boolean {
  return (opts.features?.mintable || opts.features?.pausable) as boolean;
}

export function buildKIP17(opts: KIP17Options): Contract {
  const allOpts = withDefaults(opts);

  const c = new ContractBuilder(allOpts.metadata.name);

  const { access, info } = allOpts;

  addKIP17Base(c, allOpts.metadata.name, allOpts.metadata.symbol);

  if (allOpts.metadata.baseUri) {
    addKIP17BaseURI(c, allOpts.metadata.baseUri);
  }

  if (allOpts.features.enumerable) {
    addKIP17Enumerable(c);
  }

  if (allOpts.features.freezable) {
    addKIP17Freezable(c, access);
  }

  if (allOpts.features.uriStorage) {
    addKIP17URIStorage(c);
  }

  if (allOpts.features.pausable) {
    addKIP17Pausable(c, access);
  }

  if (allOpts.features.burnable) {
    addKIP17Burnable(c);
  }

  if (allOpts.features.mintable) {
    addKIP17Mintable(
      c,
      access,
      allOpts.features.autoIncrementId,
      allOpts.features.uriStorage
    );
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
