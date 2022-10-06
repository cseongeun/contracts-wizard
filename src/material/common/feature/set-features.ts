import { ContractBuilder } from "../../../utils/contract";

export enum ERC20TypeFeatureType {
  CAPPED = "CAPPED",
  BURNABLE = "BURNABLE",
  FREEZABLE = "FREEZABLE",
  PAUSABLE = "PAUSABLE",
  MINTABLE = "MINTABLE",
  LOCKABLE = "LOCKABLE",
  BATCH_TRANSFERABLE = "BATCH_TRANSFERABLE",
}

export enum ERC721TypeFeatureType {
  ENUMERABLE = "ENUMERABLE",
  URI_STORAGABLE = "URI_STORAGABLE",
  PAUSABLE = "PAUSABLE",
  BURNABLE = "BURNABLE",
  MINTABLE = "MINTABLE",
  FREEZABLE = "FREEZABLE",
  BATCH_TRRANSFERABLE = "BATCH_TRRANSFERABLE",
}

export enum Access {
  NONE = "Access.NONE",
  OWNABLE = "Access.OWNABLE",
  ROLES = "Access.ROLES",
}

export function setFeatures(c: ContractBuilder, features: any[]) {
  if (features.length > 0) {
    c.addConstructorCode(
      `FeatureType[] memory _features = new FeatureType[](${features.length});`
    );

    features.map((feature: any, index: number) => {
      c.addConstructorCode(`_features[${index}] = FeatureType.${feature};`);
    });

    c.addConstructorCode("");
    c.addConstructorCode(`_setFeatures(_features);`);
  }
}

export function setAccess(c: ContractBuilder, access: Access) {
  c.addConstructorCode(`_setAccess(${access});`);
}
