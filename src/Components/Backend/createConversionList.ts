//createConversionList.ts
//Create list of output files from input files and settings. Flag duplicates for dialog.

import { join, dirname, basename, extname } from "@tauri-apps/api/path";
import { exists } from "@tauri-apps/api/fs";
interface Settings {
  filePath: string;
  inputType: string[];
  outputType: string[];
}

export default async function createConversionList(settings:Settings, files:string[]) {
  console.log("createConversionList", settings, files);
  const outputFormats = settings.outputType
  
  console.log("outputFormats", outputFormats);
  const conversionList = [];

  for (const inputFile of files) {
    for (const outputFormat of outputFormats) {
      let outputFile = `${await join(
        await dirname(inputFile),
        await basename(inputFile, await extname(inputFile))
      )}${outputFormat}`;
      let duplicate = false;
      if (await exists(outputFile)) {
        if (inputFile === outputFile) continue;
        duplicate = true;
        //this file gets flagged for duplicate dialog
      }
      // console.log("inputFile", `${inputFile}`);
      // console.log("outputFile", `${outputFile}`);

      conversionList.push({
        inputFile,
        outputFile,
        outputFormat,
        duplicate,
      });
    }
  }
  console.log("createConverstionList Pending conversion:", conversionList);
  return conversionList;











  // const responseActions = {
  //   o: () => {
  //     return (response = null);
  //   },
  //   oa: () => {
  //     /* Nothing to do as default is overwrite with ffmpeg */
  //   },
  //   r: () => {
  //     outputFile = outputFileCopy;
  //     return (response = null);
  //   },
  //   ra: () => {
  //     outputFile = outputFileCopy;
  //   },
  //   s: () => {
  //     outputFile = "skipped!";
  //     return (response = null);
  //   },
  //   sa: () => {
  //     outputFile = "skipped!";
  //   },
  // };
  // switch (response) {
  //   // case null:
  //   //   console.warn("response is null in creatConverstionList");
  //   //   break;
  //   case "":
  //     break;
  //   case "ra":
  //     responseActions["ra"]();
  //     break;
  //   case "sa":
  //     responseActions["sa"]();
  //     break;
  //   case "oa":
  //     console.log("OVERWRITE FILE", outputFile);
  //     break;
  //   default:
  //     while (true) {
  //       console.log("outputFile", outputFile);
  //       if (await exists(outputFile)) {
  //         response = DuplicateDialog(outputFile);
  //         //response = response.trim().toLowerCase();
  //         if (responseActions[response]) {
  //           responseActions[response]();
  //           break;
  //         } else {
  //           response = null;
  //           console.log("You did not enter a valid selection, try again.");
  //         }
  //       } else break;
  //     }
  // }

  // while (true) {

  // const accept_answer = await ConfirmDialog(
  //   "This is the list of files to be converted. Accept? Type yes or no: "
  // );
  // if (/^no$/i.test(accept_answer)) throw new Error("Conversion cancelled");
  // if (!/^yes$/i.test(accept_answer)) {
  //   console.warn('invalid input, please use "yes" or "no"');
  //   continue;
  // }

  // }
}