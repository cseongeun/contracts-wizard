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
import { addERC1155Supply } from "./feature/add-erc1155-supply";
import { addERC1155Base } from "./metadata/add-erc1155-base";
import { addERC1155URI } from "./metadata/add-erc1155-uri";
import { addERC1155Freezable } from "./feature/add-erc1155-freezable";
import { setAccess, setFeatures } from "../../common/feature/set-features";

export interface ERC1155Options extends CommonOptions {
  metadata: {
    name: string;
    uri: string;
  };
  features: {
    burnable?: boolean;
    freezable?: boolean;
    pausable?: boolean;
    mintable?: boolean;
    supply?: boolean;
    updatableUri?: boolean;
  };
}

export const defaults: Required<ERC1155Options> = {
  metadata: {
    name: "MyToken",
    uri: "",
  },
  features: {
    burnable: false,
    pausable: false,
    freezable: false,
    mintable: false,
    supply: false,
    updatableUri: true,
  },
  access: "ownable",
  info: commonDefaults.info,
} as const;

function withDefaults(opts: ERC1155Options): Required<ERC1155Options> {
  return {
    metadata: {
      name: opts.metadata.name ?? defaults.metadata.name,
      uri: opts.metadata.uri ?? defaults.metadata.uri,
    },
    features: {
      burnable: opts.features.burnable ?? defaults.features.burnable,
      freezable: opts.features.freezable ?? defaults.features.freezable,
      pausable: opts.features.pausable ?? defaults.features.pausable,
      mintable: opts.features.mintable ?? defaults.features.mintable,
      supply: opts.features.supply ?? defaults.features.supply,
      updatableUri:
        opts.features.updatableUri ?? defaults.features.updatableUri,
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
    opts.features?.updatableUri !== false) as boolean;
}

export function buildERC1155(opts: ERC1155Options): Contract {
  const allOpts = withDefaults(opts);

  const c = new ContractBuilder(allOpts.metadata.name);

  const { access, info } = allOpts;

  addERC1155Base(c, allOpts.metadata.uri);

  if (allOpts.features.updatableUri) {
    addERC1155URI(c, access);
  }

  if (allOpts.features.pausable) {
    addERC1155Pausable(c, access);
  }

  if (allOpts.features.freezable) {
    addERC1155Freezable(c, access);
  }

  if (allOpts.features.burnable) {
    addERC1155Burnable(c);
  }

  if (allOpts.features.mintable) {
    addERC1155Mintable(c, access);
  }

  if (allOpts.features.supply) {
    addERC1155Supply(c);
  }

  setAccessControl(c, access);
  setInformation(c, info);

  return c;
}
