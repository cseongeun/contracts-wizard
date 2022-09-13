import { ContractBuilder } from "../../../utils/contract";

export enum Access {
  NONE = "ACCESS.NONE",
  OWNABLE = "ACCESS.OWNABLE",
  ROLES = "ACCESS.ROLES",
}

export function setFeatures(c: ContractBuilder, features: any[]) {
  if (features.length > 0) {
    c.addConstructorCode(
      `FeatureType[] memory _features = new Features[](${features.length});`
    );

    features.map((feature: any, index: number) => {
      c.addConstructorCode(`_features[${index}] = ${feature};`);
    });

    c.addConstructorCode(`_setFeatures(_features);`);
  }
}

export function setAccess(c: ContractBuilder, access: Access) {
  c.addConstructorCode(`_setAccess(${access});`);
}
