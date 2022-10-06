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
import { addERC721Pausable } from "./feature/add-erc721-pausable";
import { addERC721Base } from "./metadata/add-erc721-base";
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
  };
  features: {
    burnable?: boolean;
    pausable?: boolean;
    autoIncrementId?: boolean;
    freezable?: boolean;
    batchTransferable?: boolean;
  };
}

export const defaults: Required<ERC721Options> = {
  metadata: {
    name: "MyToken",
    symbol: "MTK",
  },
  features: {
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
    },
    features: {
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
  return opts.features?.pausable as boolean;
}

export function buildERC721(opts: ERC721Options): Contract {
  const allOpts = withDefaults(opts);

  const c = new ContractBuilder(allOpts.metadata.name);

  const { access, info } = allOpts;
  const features = [];

  addERC721Base(
    c,
    allOpts.metadata.name,
    allOpts.metadata.symbol,
    allOpts.features.autoIncrementId,
    access
  );

  if (allOpts.features.freezable) {
    features.push([ERC721TypeFeatureType.FREEZABLE]);
    addERC721Freezable(c, access);
  }

  if (allOpts.features.pausable) {
    features.push([ERC721TypeFeatureType.PAUSABLE]);
    addERC721Pausable(c, access);
  }

  if (allOpts.features.burnable) {
    features.push([ERC721TypeFeatureType.BURNABLE]);
    addERC721Burnable(c);
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
