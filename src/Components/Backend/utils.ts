// import { openSync, closeSync, existsSync, appendFileSync, writeFileSync } from "fs";
import moment from "moment";
import {readTextFile, writeTextFile, exists, BaseDirectory } from "@tauri-apps/api/fs"

const isFileBusy = async (file:string) : Promise<Boolean|undefined> => {
  if (!exists(file)) return false;
  try {
    const fd:any = readTextFile(file);
    readTextFile(fd);
    return false;
  } catch (error: any) {
    if (error.code === "EBUSY") {
      // const userInput = await getAnswer(
      //   chalk.redBright(
      //     `\n${error}\n🚨🚨⛔ Close ${file} and press Enter to continue ⛔🚨🚨`
      //   )
      // );
      console.error(error);
      return true;
    } else if (error.code === "ENOENT") {
      console.error("code", error);
    } else {
      console.error(`\n🚨🚨⛔ Error writing to CSV file: ${error} ⛔🚨🚨`);
      throw error;
    }
  }
};

const addToLog:any = async (log:any, file:any) => {
  const logPath = { dir: BaseDirectory.AppData }
  let fileName = `${logPath}/logs.csv`;
  const timestamp = moment().format("YYYY-MM-DD HH:mm:ss");
  if (log.type === "stderr") {
    fileName = `${logPath}/error.csv`;

    if (!exists(fileName)) {
      try {
        //console.log("error.csv did not exist");
        writeTextFile(fileName, "Timestamp,Error, file\n");
        return;
      } catch (error) {
        console.error("ADD to LOG ERROR");
        return addToLog(log, file);
      }
    }
    log.data = log.data.replace(/\r\n|\r/g, "");
    try {
      const csvRow = `${timestamp},${log.data},${file.inputFile},${file.outputFile}\n`;
      appendFileSync(fileName, csvRow);
    } catch (err) {
      console.error(`🚨🚨⛔ Error writing to CSV file: ${err} ⛔🚨🚨`);
    }
    return;
  }
  if (!exists(fileName)) {
    try {
      //console.log("logs.csv did not exist");
      writeTextFile(fileName, "Timestamp,Exit Code, Input, Output\n"); // Header for the CSV file
      return;
    } catch (error) {
      return addToLog(log, file);
    }
  }
  try {
    const csvRow = `${timestamp},${log.data},${file.inputFile},${file.outputFile}\n`;
    appendFileSync(fileName, csvRow);
  } catch (err) {
    console.error(`🚨🚨⛔ Error writing to CSV file: ${err} ⛔🚨🚨`);
  }
};

export {
  isFileBusy,
  addToLog,
};
