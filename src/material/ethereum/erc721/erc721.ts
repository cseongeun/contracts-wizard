import {
  CommonOptions,
  withCommonDefaults,
  defaults as commonDefaults,
} from "../../../utils/common-options";
import { Contract, ContractBuilder } from "../../../utils/contract";
import { printContract } from "../../../utils/print";
import { defineFunctions } from "../../../utils/define-functions";
import {
  Accesses,
  setAccessControl,
} from "../../common/access/set-access-control";
import { setInformation } from "../../common/information/set-info";
import { addERC721Burnable } from "./feature/add-erc721-burnable";
import { addERC721Enumerable } from "./feature/add-erc721-enumerable";
import { addERC721Mintable } from "./feature/add-erc721-mintable";
import { addERC721Pausable } from "./feature/add-erc721-pausable";
import { addERC721URIStorage } from "./feature/add-erc721-uriStorage";
import { addERC721Base } from "./metadata/add-erc721-base";
import { addERC721BaseURI } from "./metadata/add-erc721-baseURI";
import { setAccess, setFeatures } from "../../common/feature/set-features";

enum Features {
  BASE_URI = "Features.BASE_URI",
  ENUMERABLE = "Features.ENUMERABLE",
  URI_STORAGE = "Features.URI_STORAGE",
  PAUSABLE = "Features.PAUSABLE",
  BURNABLE = "Features.BURNABLE",
  MINTABLE = "Features.MINTABLE",
}

export interface ERC721Options extends CommonOptions {
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

export const defaults: Required<ERC721Options> = {
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

function withDefaults(opts: ERC721Options): Required<ERC721Options> {
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

export function printERC721(opts: ERC721Options = defaults): string {
  return printContract(buildERC721(opts));
}

export function isAccessControlRequired(opts: Partial<ERC721Options>): boolean {
  return (opts.features?.mintable || opts.features?.pausable) as boolean;
}

export function buildERC721(opts: ERC721Options): Contract {
  const allOpts = withDefaults(opts);

  const c = new ContractBuilder(allOpts.metadata.name);

  const { access, info } = allOpts;
  const features = [];

  addERC721Base(c, allOpts.metadata.name, allOpts.metadata.symbol);

  if (allOpts.metadata.baseUri) {
    features.push(Features.BASE_URI);
    addERC721BaseURI(c, allOpts.metadata.baseUri);
  }

  if (allOpts.features.enumerable) {
    features.push(Features.ENUMERABLE);
    addERC721Enumerable(c);
  }

  if (allOpts.features.uriStorage) {
    features.push(Features.URI_STORAGE);
    addERC721URIStorage(c);
  }

  if (allOpts.features.pausable) {
    features.push(Features.PAUSABLE);
    addERC721Pausable(c, access);
  }

  if (allOpts.features.burnable) {
    features.push(Features.BURNABLE);
    addERC721Burnable(c);
  }

  if (allOpts.features.mintable) {
    features.push(Features.MINTABLE);
    addERC721Mintable(
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
    !access
      ? Accesses.NONE
      : access == "ownable"
      ? Accesses.OWNABLE
      : Accesses.ROLES
  );

  return c;
}
