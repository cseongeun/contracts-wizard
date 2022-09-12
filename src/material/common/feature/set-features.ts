import { ContractBuilder } from "../../../utils/contract";

export function setFeatures(c: ContractBuilder, features: string[]) {
  c.addConstructorCode(`_setFeatures([${features}])`);
}

export function setAccess(c: ContractBuilder, access: string) {
  c.addConstructorCode(`_setAccess(${access})`);
}
