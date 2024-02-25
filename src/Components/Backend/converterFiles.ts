//Creaters workers to conver files
//import { Worker  as WorkerT }  from "worker_threads"
import { performance as perform } from "perf_hooks";;
import { cpus } from 'os';
import { isFileBusy, addToLog } from"./utils";

const convertFiles = async ({files, settings}) => {
  const jobStartTime = perform.now();
  await isFileBusy(`${settings.filePath}/logs.csv`);
  await isFileBusy(`${settings.filePath}/error.csv`);
  try {
    var cpuNumber:number = cpus().length;
  } catch {
    var cpuNumber:number = 8;
    console.warn(
      "🚨🚨⛔ Could not detect amount of CPU cores!!! Setting to 8 ⛔🚨🚨"
    );
  }
let Worker;
if (process && process.release && process.release.name === 'node') {
  // Running in Node.js environment
  Worker = require('worker_threads').Worker;
} else {
  // Running in browser environment
  // Use alternative or polyfill for web workers
  // For example:
  Worker = window.Worker;
}
  const maxConcurrentWorkers = Math.round(Math.min(cpuNumber, files.length));
  const failedFiles:string[] = [];
  const successfulFiles:string[] = [];
  console.info("\n   Detected 🕵️‍♂️", cpuNumber, "CPU Cores 🖥");
  console.log("   Using", cpuNumber, "concurrent 🧵 threads");

  const processFile = async (file:any, workerCounter:number, task:number, tasksLeft:number) => {
    const workerStartTime = perform.now();
    console.log(
      // chalk.cyanBright(
        `\n🛠️👷‍♂️ Worker ${workerCounter} has started 📋 task ${task} with ${tasksLeft} tasks left on outputfile:\n   ${file.outputFile}📤`
      // )
    );

    return new Promise((resolve, reject):void => {
      console.log("m--dir", __dirname);
      const worker = new WorkerT(`${__dirname}/converterWorker.js`, {
        workerData: file,
      });

      worker.on("message", (message:any) => {
        if (message.type === "stderr") {
          console.error("ERROR MESSAGE FROM FFMPEG", message.data);
          //console.warn(`filepath`, __dirname, __filename);
          addToLog(message, file);
          return;
        }
        if (message.type === "code") {
          const workerEndTime = perform.now();
          const workerCompTime = workerEndTime - workerStartTime;
          addToLog(message, file);
          if (message.data === 0) {
            successfulFiles.push(file);
            console.log(
              // chalk.greenBright(
                `\n🛠️👷‍♂️ Worker`,
                workerCounter,
                `finished task`,
                task,

                `\n   Input"${file.inputFile}\n   Output"${
                  file.outputFile
                }✅\n   in ${workerCompTime.toFixed(0)} milliseconds🕖`
              // )
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
      worker.on("error", (code:number) => {
        console.error(`🚨🚨⛔ Worker had an error with code:`, code, "⛔🚨🚨");
        reject(code);
      });

      worker.on("exit", (code:number) => {});
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
