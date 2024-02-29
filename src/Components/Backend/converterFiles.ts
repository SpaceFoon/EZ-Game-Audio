//Creaters workers to conver files
//import { Worker  as WorkerT }  from "worker_threads"
//import { performance as perform } from "perf_hooks";;
import { addToLog } from"./utils";
// import {invoke} from '@tauri-apps/api/tauri'
// import { process, shell} from '@tauri-apps/api';
// import { dirname as __durname } from '@tauri-apps/api/path';
import { resolveResource } from '@tauri-apps/api/path';

interface File {
  inputFile: string;
  outputFile: string;
}
const convertFiles = async (files:File[]) => {
  // const jobStartTime = perform.now();
  let cpuNumber:number = window.navigator.hardwareConcurrency;
  const maxConcurrentWorkers = Math.round(Math.min(cpuNumber, files.length));
  const failedFiles:string[] = [];
  const successfulFiles:string[] = [];
  console.info("\n   Detected 🕵️‍♂️", cpuNumber, "CPU Cores 🖥");
  console.log("   Using", cpuNumber, "concurrent 🧵 threads");

  const processFile = async (file: File, workerCounter: number, task: number, tasksLeft: number) => {
    console.log(
      `\n🛠️👷‍♂️ Worker ${workerCounter} has started 📋 task ${task} with ${tasksLeft} tasks left on outputfile:\n   ${file.outputFile}📤`
    );
    //const workerStartTime = perform.now();
    const resourcePath = await resolveResource('src/assets/ffmpeg.exe');
console.log("resource--------",resourcePath);
    return new Promise<void>((resolve, reject) => {
    
      const worker = new Worker("./src/Components/Backend/converterWorker.ts", {type: "module"});
      worker.postMessage([file, resourcePath]);
      worker.onmessage = ({ data }) => {
        if (data.type === "stderr") {
          console.error("ERROR MESSAGE FROM FFMPEG", data.data);
          addToLog(data, file);
        } else if (data.type === "code") {
             //const workerEndTime = perform.now();
          //const workerCompTime = workerEndTime - workerStartTime;
          addToLog(data, file);
          if (data.data === 0) {
            console.log(
                          
             `\n🛠️👷‍♂️ Worker`,
                workerCounter,
                `finished task`, file.outputFile)
            // console.log(
            //   // chalk.greenBright(
            //     `\n🛠️👷‍♂️ Worker`,
            //     workerCounter,
            //     `finished task`,
            //     task,

            //     `\n   Input"${file.inputFile}\n   Output"${
            //       file.outputFile
            //     }
            //     ✅\n   in 
            //     ${workerCompTime.toFixed(0)} milliseconds🕖`
            //   // )
            // );
            successfulFiles.push(file.outputFile);
            resolve();
          } else {
            if (!failedFiles.includes(file.outputFile)) {
              failedFiles.push(file.outputFile);
            }
            console.error(
              "\n🚨🚨⛔ Worker",
              workerCounter,
              "did not finish file ⛔🚨🚨: ",
              file.outputFile,
              "🔇"
            );
            resolve();
          }
        }
      };

      worker.onerror = (error) => {
        console.error(`🚨🚨⛔ Worker had an error:`, error, "⛔🚨🚨");
        reject(error);
      };
    });
  };

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
            if (workerCounter > maxConcurrentWorkers) workerCounter = workerCounter - maxConcurrentWorkers;
            if (file){
            await processFile(file, workerCounter, task, tasksLeft);
            }
          } catch (error) {
            console.error("ERROR", error);
          }
        }
      })()
    );
  }

  await Promise.all(workerPromises);
  return { failedFiles, successfulFiles };
};

export default convertFiles;