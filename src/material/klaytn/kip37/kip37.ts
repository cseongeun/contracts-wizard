import {
  CommonOptions,
  defaults as commonDefaults,
  withCommonDefaults,
} from "../../../utils/common-options";
import { Contract, ContractBuilder } from "../../../utils/contract";
import { printContract } from "../../../utils/print";
import { defineFunctions } from "../../../utils/define-functions";
import {
  Accesses,
  setAccessControl,
} from "../../common/access/set-access-control";
import { setInformation } from "../../common/information/set-info";
import { addKIP37Burnable } from "./feature/add-kip37-burnable";
import { addKIP37Mintable } from "./feature/add-kip37-mintable";
import { addKIP37Pausable } from "./feature/add-kip37-pausable";
import { addKIP37Supply } from "./feature/add-kip37-supply";
import { addKIP37Base } from "./metadata/add-kip37-base";
import { addKIP37URI } from "./metadata/add-kip37-uri";
import { addKIP37Freezable } from "./feature/add-kip37-freezable";
import { setAccess, setFeatures } from "../../common/feature/set-features";

enum Features {
  URI = "Features.URI",
  PAUSABLE = "Features.PAUSABLE",
  FREEZABLE = "Features.FREEZABLE",
  BURNABLE = "Features.BURNABLE",
  MINTABLE = "Features.MINTABLE",
  SUPPLY = "Features.SUPPLY",
}

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
  const features = [];

  addKIP37Base(c, allOpts.metadata.uri);

  if (allOpts.features.updatableUri) {
    features.push(Features.URI);
    addKIP37URI(c, access);
  }

  if (allOpts.features.pausable) {
    features.push(Features.PAUSABLE);
    addKIP37Pausable(c, access);
  }

  if (allOpts.features.freezable) {
    features.push(Features.FREEZABLE);
    addKIP37Freezable(c, access);
  }

  if (allOpts.features.burnable) {
    features.push(Features.BURNABLE);
    addKIP37Burnable(c);
  }

  if (allOpts.features.mintable) {
    features.push(Features.MINTABLE);
    addKIP37Mintable(c, access);
  }

  if (allOpts.features.supply) {
    features.push(Features.SUPPLY);
    addKIP37Supply(c);
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
