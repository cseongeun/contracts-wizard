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
import { addBEP721Burnable } from "./feature/add-bep721-burnable";
import { addBEP721Enumerable } from "./feature/add-bep721-enumerable";
import { addBEP721Mintable } from "./feature/add-bep721-mintable";
import { addBEP721Pausable } from "./feature/add-bep721-pausable";
import { addBEP721URIStorage } from "./feature/add-bep721-uriStorage";
import { addBEP721Base } from "./metadata/add-bep721-base";
import { addBEP721BaseURI } from "./metadata/add-bep721-baseURI";

export interface BEP721Options extends CommonOptions {
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
  };
}

export const defaults: Required<BEP721Options> = {
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
  },
  access: commonDefaults.access,
  info: commonDefaults.info,
} as const;

function withDefaults(opts: BEP721Options): Required<BEP721Options> {
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
    },
    ...withCommonDefaults(opts),
  };
}

export function printBEP721(opts: BEP721Options = defaults): string {
  return printContract(buildBEP721(opts));
}

export function isAccessControlRequired(opts: Partial<BEP721Options>): boolean {
  return (opts.features?.mintable || opts.features?.pausable) as boolean;
}

export function buildBEP721(opts: BEP721Options): Contract {
  const allOpts = withDefaults(opts);

  const c = new ContractBuilder(allOpts.metadata.name);

  const { access, info } = allOpts;

  addBEP721Base(c, allOpts.metadata.name, allOpts.metadata.symbol);

  if (allOpts.metadata.baseUri) {
    addBEP721BaseURI(c, allOpts.metadata.baseUri);
  }

  if (allOpts.features.enumerable) {
    addBEP721Enumerable(c);
  }

  if (allOpts.features.uriStorage) {
    addBEP721URIStorage(c);
  }

  if (allOpts.features.pausable) {
    addBEP721Pausable(c, access);
  }

  if (allOpts.features.burnable) {
    addBEP721Burnable(c);
  }

  if (allOpts.features.mintable) {
    addBEP721Mintable(
      c,
      access,
      allOpts.features.autoIncrementId,
      allOpts.features.uriStorage
    );
  }

  setAccessControl(c, access);
  setInformation(c, info);

  return c;
}
