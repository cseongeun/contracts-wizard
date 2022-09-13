import { ContractBuilder } from "../../../utils/contract";

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

    c.addConstructorCode(`_setFeatures(_features);`);
  }
}

export function setAccess(c: ContractBuilder, access: Access) {
  c.addConstructorCode(`_setAccess(${access});`);
}
