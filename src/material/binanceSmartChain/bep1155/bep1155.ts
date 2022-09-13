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
import { addBEP1155Burnable } from "./feature/add-bep1155-burnable";
import { addBEP1155Mintable } from "./feature/add-bep1155-mintable";
import { addBEP1155Pausable } from "./feature/add-bep1155-pausable";
import { addBEP1155Supply } from "./feature/add-bep1155-supply";
import { addBEP1155Base } from "./metadata/add-bep1155-base";
import { addBEP1155URI } from "./metadata/add-bep1155-uri";
import { addBEP1155Freezable } from "./feature/add-bep1155-freezable";
import { setAccess, setFeatures } from "../../common/feature/set-features";

export interface BEP1155Options extends CommonOptions {
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

export const defaults: Required<BEP1155Options> = {
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

function withDefaults(opts: BEP1155Options): Required<BEP1155Options> {
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

export function printBEP1155(opts: BEP1155Options = defaults): string {
  return printContract(buildBEP1155(opts));
}

export function isAccessControlRequired(
  opts: Partial<BEP1155Options>
): boolean {
  return (opts.features?.mintable ||
    opts.features?.freezable ||
    opts.features?.pausable ||
    opts.features?.updatableUri !== false) as boolean;
}

export function buildBEP1155(opts: BEP1155Options): Contract {
  const allOpts = withDefaults(opts);

  const c = new ContractBuilder(allOpts.metadata.name);

  const { access, info } = allOpts;

  addBEP1155Base(c, allOpts.metadata.uri);

  if (allOpts.features.updatableUri) {
    addBEP1155URI(c, access);
  }

  if (allOpts.features.pausable) {
    addBEP1155Pausable(c, access);
  }

  if (allOpts.features.freezable) {
    addBEP1155Freezable(c, access);
  }

  if (allOpts.features.burnable) {
    addBEP1155Burnable(c);
  }

  if (allOpts.features.mintable) {
    addBEP1155Mintable(c, access);
  }

  if (allOpts.features.supply) {
    addBEP1155Supply(c);
  }

  setAccessControl(c, access);
  setInformation(c, info);

  return c;
}
