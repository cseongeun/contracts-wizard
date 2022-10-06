import {
  CommonOptions,
  defaults as commonDefaults,
  withCommonDefaults,
} from "../../../utils/common-options";
import { Contract, ContractBuilder } from "../../../utils/contract";
import { printContract } from "../../../utils/print";
import { defineFunctions } from "../../../utils/define-functions";
import { setAccessControl } from "../../common/access/set-access-control";
import { setInformation } from "../../common/information/set-info";
import { addERC1155Burnable } from "./feature/add-erc1155-burnable";
import { addERC1155Mintable } from "./feature/add-erc1155-mintable";
import { addERC1155Pausable } from "./feature/add-erc1155-pausable";
import { addERC1155SupplyTrackable } from "./feature/add-erc1155-supplyTrackable";
import { addERC1155Base } from "./metadata/add-erc1155-base";
import { addERC1155Freezable } from "./feature/add-erc1155-freezable";
import { addERC1155URIStoragable } from "./feature/add-erc1155-uriStoragable";

export interface ERC1155Options extends CommonOptions {
  metadata: {
    name: string;
    baseURI: string;
  };
  features: {
    burnable?: boolean;
    freezable?: boolean;
    mintable?: boolean;
    pausable?: boolean;
    supplyTackable?: boolean;
    uriStoragable?: boolean;
  };
}

export const defaults: Required<ERC1155Options> = {
  metadata: {
    name: "MyToken",
    baseURI: "",
  },
  features: {
    mintable: true,
    burnable: false,
    pausable: false,
    freezable: false,
    supplyTackable: false,
    uriStoragable: false,
  },
  access: "ownable",
  info: commonDefaults.info,
} as const;

function withDefaults(opts: ERC1155Options): Required<ERC1155Options> {
  return {
    metadata: {
      name: opts.metadata.name ?? defaults.metadata.name,
      baseURI: opts.metadata.baseURI ?? defaults.metadata.baseURI,
    },
    features: {
      burnable: opts.features.burnable ?? defaults.features.burnable,
      freezable: opts.features.freezable ?? defaults.features.freezable,
      pausable: opts.features.pausable ?? defaults.features.pausable,
      mintable: opts.features.mintable ?? defaults.features.mintable,
      supplyTackable:
        opts.features.supplyTackable ?? defaults.features.supplyTackable,
      uriStoragable:
        opts.features.uriStoragable ?? defaults.features.uriStoragable,
    },
    ...withCommonDefaults(opts),
  };
}

export function printERC1155(opts: ERC1155Options = defaults): string {
  return printContract(buildERC1155(opts));
}

export function isAccessControlRequired(
  opts: Partial<ERC1155Options>
): boolean {
  return (opts.features?.mintable ||
    opts.features?.freezable ||
    opts.features?.pausable ||
    opts.features?.uriStoragable) as boolean;
}

export function buildERC1155(opts: ERC1155Options): Contract {
  const allOpts = withDefaults(opts);

  const c = new ContractBuilder(allOpts.metadata.name);

  const { access, info } = allOpts;

  addERC1155Base(c, allOpts.metadata.baseURI);

  if (allOpts.features.burnable) {
    addERC1155Burnable(c);
  }

  if (allOpts.features.freezable) {
    addERC1155Freezable(c, access);
  }

  if (allOpts.features.mintable) {
    addERC1155Mintable(c, access);
  }

  if (allOpts.features.pausable) {
    addERC1155Pausable(c, access);
  }

  if (allOpts.features.supplyTackable) {
    addERC1155SupplyTrackable(c);
  }

  if (allOpts.features.uriStoragable) {
    addERC1155URIStoragable(c, access);
  }

  setAccessControl(c, access);
  setInformation(c, info);

  return c;
}