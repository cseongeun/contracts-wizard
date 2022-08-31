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
import { addKIP17Burnable } from "./feature/add-kip17-burnable";
import { addKIP17Enumerable } from "./feature/add-kip17-enumerable";
import { addKIP17Mintable } from "./feature/add-kip17-mintable";
import { addKIP17Pausable } from "./feature/add-kip17-pausable";
import { addKIP17URIStorage } from "./feature/add-kip17-uriStorage";
import { addKIP17Base } from "./metadata/add-kip17-base";
import { addKIP17BaseURI } from "./metadata/add-kip17-baseURI";

export interface KIP17Options extends CommonOptions {
  name: string;
  symbol: string;
  baseUri?: string;
  features: {
    enumerable?: boolean;
    uriStorage?: boolean;
    burnable?: boolean;
    pausable?: boolean;
    mintable?: boolean;
    autoIncrementId?: boolean;
  };
}

export const defaults: Required<KIP17Options> = {
  name: "MyToken",
  symbol: "MTK",
  baseUri: "",
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

function withDefaults(opts: KIP17Options): Required<KIP17Options> {
  return {
    ...opts,
    ...withCommonDefaults(opts),
    baseUri: opts.baseUri ?? defaults.baseUri,
    features: {
      enumerable: opts.features.enumerable ?? defaults.features.enumerable,
      uriStorage: opts.features.uriStorage ?? defaults.features.uriStorage,
      burnable: opts.features.burnable ?? defaults.features.burnable,
      pausable: opts.features.pausable ?? defaults.features.pausable,
      mintable: opts.features.mintable ?? defaults.features.mintable,
      autoIncrementId:
        opts.features.autoIncrementId ?? defaults.features.autoIncrementId,
    },
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

  const c = new ContractBuilder(allOpts.name);

  const { access, info } = allOpts;

  addKIP17Base(c, allOpts.name, allOpts.symbol);

  if (allOpts.baseUri) {
    addKIP17BaseURI(c, allOpts.baseUri);
  }

  if (allOpts.features.enumerable) {
    addKIP17Enumerable(c);
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