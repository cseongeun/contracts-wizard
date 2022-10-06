import {
  CommonOptions,
  withCommonDefaults,
  defaults as commonDefaults,
} from "../../../utils/common-options";
import { Contract, ContractBuilder } from "../../../utils/contract";
import { printContract } from "../../../utils/print";
import { setAccessControl } from "../../common/access/set-access-control";
import { setInformation } from "../../common/information/set-info";
import { addERC721Burnable } from "./feature/add-erc721-burnable";
import { addERC721Enumerable } from "./feature/add-erc721-enumerable";
import { addERC721Mintable } from "./feature/add-erc721-mintable";
import { addERC721Pausable } from "./feature/add-erc721-pausable";
import { addERC721URIStoragable } from "./feature/add-erc721-uriStoragable";
import { addERC721Base } from "./metadata/add-erc721-base";
import { addERC721BaseURI } from "./metadata/add-erc721-baseURI";
import { addERC721Freezable } from "./feature/add-erc721-freezable";
import { addERC721BatchTransferable } from "./feature/add-erc721-batchTransferable";
import {
  Access,
  ERC721TypeFeatureType,
  setAccess,
  setFeatures,
} from "../../common/feature/set-features";

export interface ERC721Options extends CommonOptions {
  metadata: {
    name: string;
    symbol: string;
    baseUri?: string;
  };
  features: {
    enumerable?: boolean;
    uriStoragable?: boolean;
    burnable?: boolean;
    pausable?: boolean;
    mintable?: boolean;
    autoIncrementId?: boolean;
    freezable?: boolean;
    batchTransferable?: boolean;
  };
}

export const defaults: Required<ERC721Options> = {
  metadata: {
    name: "MyToken",
    symbol: "MTK",
    baseUri: "",
  },
  features: {
    mintable: true,
    enumerable: false,
    uriStoragable: false,
    burnable: false,
    pausable: false,
    autoIncrementId: false,
    freezable: false,
    batchTransferable: false,
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
      mintable: opts.features.mintable ?? defaults.features.mintable,
      enumerable: opts.features.enumerable ?? defaults.features.enumerable,
      uriStoragable:
        opts.features.uriStoragable ?? defaults.features.uriStoragable,
      burnable: opts.features.burnable ?? defaults.features.burnable,
      pausable: opts.features.pausable ?? defaults.features.pausable,
      autoIncrementId:
        opts.features.autoIncrementId ?? defaults.features.autoIncrementId,
      freezable: opts.features.freezable ?? defaults.features.freezable,
      batchTransferable:
        opts.features.batchTransferable ?? defaults.features.batchTransferable,
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
    addERC721BaseURI(c, allOpts.metadata.baseUri);
  }

  if (allOpts.features.enumerable) {
    features.push([ERC721TypeFeatureType.ENUMERABLE]);
    addERC721Enumerable(c);
  }

  if (allOpts.features.freezable) {
    features.push([ERC721TypeFeatureType.FREEZABLE]);
    addERC721Freezable(c, access);
  }

  if (allOpts.features.uriStoragable) {
    features.push([ERC721TypeFeatureType.URI_STORAGABLE]);
    addERC721URIStoragable(c);
  }

  if (allOpts.features.pausable) {
    features.push([ERC721TypeFeatureType.PAUSABLE]);
    addERC721Pausable(c, access);
  }

  if (allOpts.features.burnable) {
    features.push([ERC721TypeFeatureType.BURNABLE]);
    addERC721Burnable(c);
  }

  if (allOpts.features.mintable) {
    features.push([ERC721TypeFeatureType.MINTABLE]);
    addERC721Mintable(
      c,
      access,
      allOpts.features.autoIncrementId,
      allOpts.features.uriStoragable
    );
  }

  if (allOpts.features.batchTransferable) {
    features.push([ERC721TypeFeatureType.BATCH_TRRANSFERABLE]);
    addERC721BatchTransferable(c);
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
