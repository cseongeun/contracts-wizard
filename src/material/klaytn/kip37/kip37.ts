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
import { addKIP37Burnable } from "./feature/add-kip37-burnable";
import { addKIP37Mintable } from "./feature/add-kip37-mintable";
import { addKIP37Pausable } from "./feature/add-kip37-pausable";
import { addKIP37Supply } from "./feature/add-kip37-supply";
import { addKIP37Base } from "./metadata/add-kip37-base";
import { addKIP37URI } from "./metadata/add-kip37-uri";
import { addERC1155Freezable } from "../../ethereum/erc1155/feature/add-erc1155-freezable";

export interface KIP37Options extends CommonOptions {
  metadata: {
    name: string;
    uri: string;
  };
  features: {
    burnable?: boolean;
    pausable?: boolean;
    freezable?: boolean;
    mintable?: boolean;
    supply?: boolean;
    updatableUri?: boolean;
  };
}

export const defaults: Required<KIP37Options> = {
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

function withDefaults(opts: KIP37Options): Required<KIP37Options> {
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

export function printKIP37(opts: KIP37Options = defaults): string {
  return printContract(buildKIP37(opts));
}

export function isAccessControlRequired(opts: Partial<KIP37Options>): boolean {
  return (opts.features?.mintable ||
    opts.features?.freezable ||
    opts.features?.pausable ||
    opts.features?.updatableUri !== false) as boolean;
}

export function buildKIP37(opts: KIP37Options): Contract {
  const allOpts = withDefaults(opts);

  const c = new ContractBuilder(allOpts.metadata.name);

  const { access, info } = allOpts;

  addKIP37Base(c, allOpts.metadata.uri);

  if (allOpts.features.updatableUri) {
    addKIP37URI(c, access);
  }

  if (allOpts.features.pausable) {
    addKIP37Pausable(c, access);
  }

  if (allOpts.features.pausable) {
    addERC1155Freezable(c, access);
  }

  if (allOpts.features.burnable) {
    addKIP37Burnable(c);
  }

  if (allOpts.features.mintable) {
    addKIP37Mintable(c, access);
  }

  if (allOpts.features.supply) {
    addKIP37Supply(c);
  }

  setAccessControl(c, access);
  setInformation(c, info);

  return c;
}
