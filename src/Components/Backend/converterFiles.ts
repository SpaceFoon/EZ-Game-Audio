
//converterFiles.ts
import { invoke } from "@tauri-apps/api";
import { emit } from '@tauri-apps/api/event';
interface File {
  inputFile: string;
  outputFile: string;
  outputFormat: string;
}
interface ProgressUpdate {
  successfulFile: string;
  failedFile: string;
}
interface ConvertFilesResult {
  failedFiles: string[];
  successfulFiles: string[];
}

const convertFiles = async (conversionList: File[], onProgressUpdate: (update: ProgressUpdate) => void): Promise<ConvertFilesResult> => {
  // const jobStartTime = perform.now();
  let files = conversionList;
  let cpuNumber:number = window.navigator.hardwareConcurrency;
  const maxConcurrentWorkers = Math.round(Math.min(cpuNumber, files.length));
  const failedFiles:string[] = [];
  const successfulFiles:string[] = []
  console.info("\n   Detected 🕵️‍♂️", cpuNumber, "CPU Cores 🖥");

  const processFile = async (file: File, workerCounter: number, task: number, tasksLeft: number) => {
    console.log(
      `\n🛠️👷‍♂️ Worker ${workerCounter} has started 📋 task ${task} with ${tasksLeft} tasks left on outputfile:\n   ${file.outputFile}📤`
    );
    await emit('Started-File', { file: file, workerCounter: workerCounter, task: task });
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

            if (result[2] === 0) {
              // console.log("Exit code:------------------------", result[2], result[1]), result[3];
              
              successfulFiles.push(result[1]);
              // onProgressUpdate({ successfulFile: '', failedFile: result.output_file });
              await emit('File-Success', { file: file, workerCounter: workerCounter, task: task });

            }else {
              // console.log("Exit code:------------------------", result[2], result[1]), result[3];
              // console.log("Failed to convert file:--------------------------------------", file);
              
              failedFiles.push(result[1]);
              await emit('File-Failed', { file: file, workerCounter: workerCounter, task: task });
              // onProgressUpdate({ successfulFile: result.output_file, failedFile: '' });
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
            // await emit('Error', { file: file, workerCounter: workerCounter, task: task });
            console.error("ERROR", error);
          }
        }
      })()
    );
  }

  await Promise.all(workerPromises);
  console.log("FS", failedFiles, successfulFiles);
  return { failedFiles, successfulFiles };
};

export default convertFiles;