// converterWorker.ts
// Use ffmpeg to convert files
import { Command } from "@tauri-apps/api/shell";
// import { invoke } from "@tauri-apps/api/tauri";
import { join } from "@tauri-apps/api/path";
import { dirname as __durname } from "@tauri-apps/api/path";

const converterWorker = async (file:any) => {
  // onmessage = function(file) {

  // console.log("process.env.ComSpec ", process.env.ComSpec);
  // console.log("DIRNAME worker", process.cwd(), __dirname, __filename);
  // console.log("inputFile", inputFile);
  const ffmpegPath = join(process.cwd(), `\\ffmpeg.exe`);
  // const ffmpegPath = `\\ffmpeg.exe`;
  const { inputFile, outputFile, outputFormat } = file;
  //console.log("path worker", ffmpegPath);
  return new Promise((resolve, reject) => {
    const formatConfig = {
      //Despite what you read online these are the best codecs and work fine.
      //-b:a = constant BR -q:a = variable.
      ogg: { codec: "libopus", additionalOptions: ["-b:a", "192k"] },
      mp3: { codec: "libmp3lame", additionalOptions: ["-q:a", "3"] },
      wav: { codec: "pcm_s16le" },
      m4a: { codec: "aac ", additionalOptions: ["-q:a", "1.1"] },
      flac: { codec: "flac", additionalOptions: ["-compression_level", "9"] },
    };

    const { codec, additionalOptions = [] } = formatConfig[outputFormat];
    const ffmpegCommand = new Command(
      `"${ffmpegPath}"`,
      [
        "-loglevel",
        "error", // Sends all errors to stdeer
        "-i", //input file
        `"${inputFile}"`,
        "-c:a", // = codec:audio Indicates the codec for the audio stream.
        codec,
        ...additionalOptions, // Specific codec settings
        "-vn", // -vn stops ffmpeg from making output a video file and causing errors
        // "-threads",
        // "1",
        "-y", //Disable prompts
        `"${outputFile}"`,
      ]
      // {
      //   shell: true,
      // }
    );

    ffmpegCommand.stdout.on("data", (data) => {
      console.log("stdout", data);
      // Do something with stdout if needed
    });

    ffmpegCommand.stderr.on("data", (data) => {
      console.log("data", data);
      postMessage({ type: "stderr", data: data.toString() });
    });

    ffmpegCommand.on("close", (code) => {
      console.log("close", code);
      postMessage({ type: "code", data: code });
      resolve(code);
    });

    ffmpegCommand.on("error", (error) => {
      console.error("ERROR IN WORKER FFMPEGCOMMAND", error);
      reject(error);
    });
  });
};

self.onmessage = async (event) => {
  try {
    await converterWorker(event.data);
  } catch (error) {
    console.error("ERROR IN WORKER", error);
  }
};

export default converterWorker;
