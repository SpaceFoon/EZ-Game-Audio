// Use ffmpeg to convert files
//import { spawn } from "child_process";
import { Command } from "@tauri-apps/api/shell";
import { invoke } from "@tauri-apps/api/tauri";
import { join } from "@tauri-apps/api/path";
//import { path } from "@tauri-apps/api/path";
export default async function convertAudio(settings:[], files:[string]) {
  const failedFiles = [];
  const ffmpegPath = Command.sidecar("/src/bin/ffmpeg");
  console.log("ffmpegPath", ffmpegPath);
  const convertFiles = async (inputFile, outputFile, outputFormat) => {
    try {
      await window.tauri.invoke("convert_audio", {
        input_file: inputFile,
        output_file: outputFile,
        output_format: codec,
        additional_options: additionalOptions,
      });
      console.log(
        `Conversion successful for ${getFilename(inputFile)} to ${getFilename(
          outputFile
        )}`
      );
    } catch (error) {
      failedFiles.push({ inputFile, outputFile, outputFormat });
      console.error("failed", error);
    }

    const formatInfo = formatConfig[outputFormat];

    if (!formatInfo) {
      console.error("Unsupported output format:", outputFormat);
      return;
    }

    const { codec, additionalOptions = [] } = formatInfo;
  };

  async function getFilename(filePath) {
    const match = filePath.match(/[^\\]+$/);
    return match ? match[0] : "unknown";
  }
  return { failedFiles, Finished: failedFiles.length === 0 };
}

//Creaters workers to conver files

const { Worker } = require("worker_threads");
const { performance } = require("perf_hooks");
const { cpus } = require("os");
const chalk = require("chalk");
const { isFileBusy, addToLog, settings } = require("./utils");

const convertFiles = async (files) => {
  const jobStartTime = performance.now();
  await isFileBusy(`${settings.filePath}/logs.csv`);
  await isFileBusy(`${settings.filePath}/error.csv`);
  try {
    var cpuNumber = cpus().length;
  } catch {
    var cpuNumber = 8;
    console.warn(
      "🚨🚨⛔ Could not detect amount of CPU cores!!! Setting to 8 ⛔🚨🚨"
    );
  }

  const maxConcurrentWorkers = Math.round(Math.min(cpuNumber, files.length));
  const failedFiles = [];
  const successfulFiles = [];
  console.info("\n   Detected 🕵️‍♂️", cpuNumber, "CPU Cores 🖥");
  console.log("   Using", cpuNumber, "concurrent 🧵 threads");

  const processFile = async (file, workerCounter, task, tasksLeft) => {
    const workerStartTime = performance.now();
    console.log(
      chalk.cyanBright(
        `\n🛠️👷‍♂️ Worker ${workerCounter} has started 📋 task ${task} with ${tasksLeft} tasks left on outputfile:\n   ${file.outputFile}📤`
      )
    );

    return new Promise((resolve, reject) => {
      // console.log("m--dir", __dirname);
      const worker = new Worker(`${__dirname}/converterWorker.js`, {
        workerData: file,
      });

      worker.on("message", (message) => {
        if (message.type === "stderr") {
          console.error("ERROR MESSAGE FROM FFMPEG", message.data);
          //console.warn(`filepath`, __dirname, __filename);
          addToLog(message, file);
          return;
        }
        if (message.type === "code") {
          const workerEndTime = performance.now();
          const workerCompTime = workerEndTime - workerStartTime;
          addToLog(message, file);
          if (message.data === 0) {
            successfulFiles.push(file);
            console.log(
              chalk.greenBright(
                `\n🛠️👷‍♂️ Worker`,
                workerCounter,
                `finished task`,
                task,

                `\n   Input"${file.inputFile}\n   Output"${
                  file.outputFile
                }✅\n   in ${workerCompTime.toFixed(0)} milliseconds🕖`
              )
            );
            resolve();
          } else if (message.data !== 0) {
            if (!failedFiles[file]) {
              failedFiles.push(file);
            }
            console.error(
              // chalk.bgRed(
              "\n🚨🚨⛔ Worker",
              workerCounter,
              "did not finish file ⛔🚨🚨: ",
              file.outputFile,
              "🔇"
              // )
            );
            resolve();
          }
        }
      });
      worker.on("error", (code) => {
        console.error(`🚨🚨⛔ Worker had an error with code:`, code, "⛔🚨🚨");
        reject(code);
      });

      worker.on("exit", (code) => {});
    });
  };

  // Worker Manger
  const workerPromises = [];
  let workerCounter = 0;
  let task = 0;
  for (let i = 0; i < maxConcurrentWorkers; i++) {
    workerPromises.push(
      (async () => {
        while (files.length > 0) {
          const file = files.pop();
          try {
            let tasksLeft = files.length;
            task++;
            workerCounter++;
            if (workerCounter > 8) workerCounter = workerCounter - 8;
            await processFile(file, workerCounter, task, tasksLeft);
          } catch (error) {
            console.error("ERROR", error);
          }
        }
      })()
    );
  }

  await Promise.all(workerPromises);
  return { failedFiles, successfulFiles, jobStartTime };
};
module.exports = convertFiles;
