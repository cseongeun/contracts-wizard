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
  // metadata
  name: string;
  symbol: string;
  baseUri?: string;
  // feature
  enumerable?: boolean;
  uriStorage?: boolean;
  burnable?: boolean;
  pausable?: boolean;
  mintable?: boolean;
  autoIncrementId?: boolean;
}

export const defaults: Required<KIP17Options> = {
  name: "MyToken",
  symbol: "MTK",
  baseUri: "",

  enumerable: false,
  uriStorage: false,
  burnable: false,
  pausable: false,
  mintable: false,
  autoIncrementId: false,

  access: commonDefaults.access,
  info: commonDefaults.info,
} as const;

function withDefaults(opts: KIP17Options): Required<KIP17Options> {
  return {
    ...opts,
    ...withCommonDefaults(opts),
    baseUri: opts.baseUri ?? defaults.baseUri,
    enumerable: opts.enumerable ?? defaults.enumerable,
    uriStorage: opts.uriStorage ?? defaults.uriStorage,
    burnable: opts.burnable ?? defaults.burnable,
    pausable: opts.pausable ?? defaults.pausable,
    mintable: opts.mintable ?? defaults.mintable,
    autoIncrementId: opts.autoIncrementId ?? defaults.autoIncrementId,
  };
}

export function printKIP17(opts: KIP17Options = defaults): string {
  return printContract(buildKIP17(opts));
}

export function isAccessControlRequired(opts: Partial<KIP17Options>): boolean {
  return (opts.mintable || opts.pausable) as boolean;
}

export function buildKIP17(opts: KIP17Options): Contract {
  const allOpts = withDefaults(opts);

  const c = new ContractBuilder(allOpts.name);

  const { access, info } = allOpts;

  addKIP17Base(c, allOpts.name, allOpts.symbol);

  if (allOpts.baseUri) {
    addKIP17BaseURI(c, allOpts.baseUri);
  }

  if (allOpts.enumerable) {
    addKIP17Enumerable(c);
  }

  if (allOpts.uriStorage) {
    addKIP17URIStorage(c);
  }

  if (allOpts.pausable) {
    addKIP17Pausable(c, access, [functions._beforeTokenTransfer]);
  }

  if (allOpts.burnable) {
    addKIP17Burnable(c);
  }

  if (allOpts.mintable) {
    addKIP17Mintable(c, access, allOpts.autoIncrementId, allOpts.uriStorage);
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
