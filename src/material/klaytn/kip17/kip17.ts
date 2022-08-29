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
import { addERC721Burnable } from "./feature/add-kip17-burnable";
import { addERC721Enumerable } from "./feature/add-kip17-enumerable";
import { addERC721Mintable } from "./feature/add-kip17-mintable";
import { addERC721Pausable } from "./feature/add-kip17-pausable";
import { addERC721URIStorage } from "./feature/add-kip17-uriStorage";
import { addERC721Base } from "./metadata/add-kip17-base";
import { addERC721BaseURI } from "./metadata/add-kip17-baseURI";

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

export function printERC721(opts: KIP17Options = defaults): string {
  return printContract(buildERC721(opts));
}

export function isAccessControlRequired(opts: Partial<KIP17Options>): boolean {
  return (opts.mintable || opts.pausable) as boolean;
}

export function buildERC721(opts: KIP17Options): Contract {
  const allOpts = withDefaults(opts);

  const c = new ContractBuilder(allOpts.name);

  const { access, info } = allOpts;

  addERC721Base(c, allOpts.name, allOpts.symbol);

  if (allOpts.baseUri) {
    addERC721BaseURI(c, allOpts.baseUri);
  }

  if (allOpts.enumerable) {
    addERC721Enumerable(c);
  }

  if (allOpts.uriStorage) {
    addERC721URIStorage(c);
  }

  if (allOpts.pausable) {
    addERC721Pausable(c, access, [functions._beforeTokenTransfer]);
  }

  if (allOpts.burnable) {
    addERC721Burnable(c);
  }

  if (allOpts.mintable) {
    addERC721Mintable(c, access, allOpts.autoIncrementId, allOpts.uriStorage);
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
