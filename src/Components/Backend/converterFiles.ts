
// import { addToLog } from"./utils";

// import { resolveResource } from '@tauri-apps/api/path';
import { invoke } from "@tauri-apps/api";
// import { exists, BaseDirectory } from '@tauri-apps/api/fs';

interface File {
  inputFile: string;
  outputFile: string;
  outputFormat: string;
}
const convertFiles = async (files:File[]) => {
  // const jobStartTime = perform.now();
  let cpuNumber:number = window.navigator.hardwareConcurrency;
  const maxConcurrentWorkers = Math.round(Math.min(cpuNumber, files.length));
  const failedFiles:string[] = [];
  const successfulFiles:string[] = [];
  console.info("\n   Detected 🕵️‍♂️", cpuNumber, "CPU Cores 🖥");

  const processFile = async (file: File, workerCounter: number, task: number, tasksLeft: number) => {
    console.log(
      `\n🛠️👷‍♂️ Worker ${workerCounter} has started 📋 task ${task} with ${tasksLeft} tasks left on outputfile:\n   ${file.outputFile}📤`
    );
    //const workerStartTime = perform.now();
//     const resourcePath = await resolveResource('ffmpeg-x86_64-pc-windows-msvc.exe');
// console.log("resource--------",resourcePath);
// if (await exists(resourcePath)){
//   console.log("yes")
// }else {console.log("no", {dir:  BaseDirectory});};


return new Promise<void>((resolve, reject) => {
    async function callRustFunction() {

          try {
            //console.log("file", file)
            const result:any = await invoke("my_rust_function", {
                inputFile: file.inputFile,
                outputFile: file.outputFile,
                outputFormat: file.outputFormat,
            });
            
            console.log("Result from Rust:", result);

            if (result !== undefined && result !== null && result.exit_code !== 0) {
              successfulFiles.push(result.output_file);
              // addToLog(result.exitCode, result.inputFile, result.outputFile, result.stderr_outputs);
            }else if (result === 0){
              failedFiles.push(result.output_file);
              // addToLog(result.exitCode, result.inputFile, result.outputFile)
            }
            resolve();
        } catch (error) {
            console.error("Error calling Rust function:", error);
            reject(error);
        }
    }
callRustFunction();
    })}

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