#! /usr/bin/env node
import fs from "fs";
import glob from "glob-promise";
import * as variables from "./helpers/variables";
import { log } from "./helpers/logger";
import * as constants from "./helpers/constants";
import { cleanPath } from "./helpers/clean-path";
import { replaceAllImportsRecursively } from "./helpers/replace-all-imports-recursively";
import {
  deduplicateSolidityVersoins,
  deduplicateSolidityExpHeaders,
  deduplicateLicenses,
} from "./helpers/deduplicate-lines";

export async function flatten(code: string) {
  const inputFileContent = await fs.readFileSync(
    variables.inputFilePath,
    "utf8"
  );
  let dir = variables.parentDir + constants._SLASH;
  const isAbsolutePath = !dir.startsWith(constants._DOT);
  if (!isAbsolutePath) {
    dir = __dirname + constants._SLASH + dir;
  }
  dir = cleanPath(dir);
  const path = variables.parentDir + constants._SOL;
  const srcFiles = await getSourceFiles(dir, path);
  // variables.srcFiles = srcFiles;
  await replaceImports(inputFileContent, dir);
}

async function getSourceFiles(dir: any, path: any) {
  return await glob(path);
}

async function replaceImports(inputFileContent: any, dir: any) {
  let outputFileContent: any = await replaceAllImportsRecursively(
    inputFileContent,
    dir
  );

  outputFileContent = deduplicateLicenses(outputFileContent);
  outputFileContent = deduplicateSolidityVersoins(outputFileContent);
  outputFileContent = deduplicateSolidityExpHeaders(outputFileContent);

  if (!fs.existsSync(variables.outDir)) fs.mkdirSync(variables.outDir);
  const fileName = `${variables.flatContractPrefix}_flat.sol`;
  const filePath = `${variables.outDir}/${fileName}`;
  fs.writeFileSync(filePath, outputFileContent);
  log.info(
    `Success! Flat file ${fileName} is generated to  ${variables.outDir} directory`
  );
}
