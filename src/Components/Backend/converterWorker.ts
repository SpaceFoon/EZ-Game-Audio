// service-worker.ts
// Use ffmpeg to convert files
import { Command } from "@tauri-apps/api/shell";

const ffmpegPath = "/src/assets/ffmpeg.exe";

const converterWorker = async (file: any, resourcePath: string) => {
  console.log("resourcePath", resourcePath);
  const { inputFile, outputFile, outputFormat } = file;
  console.log("Input file:", inputFile);
  console.log("Output file:", outputFile);
  console.log("Output format:", outputFormat);

  const formatConfig = {
    ogg: { codec: "libopus", additionalOptions: ["-b:a", "192k"] },
    mp3: { codec: "libmp3lame", additionalOptions: ["-q:a", "3"] },
    wav: { codec: "pcm_s16le" },
    m4a: { codec: "aac ", additionalOptions: ["-q:a", "1.1"] },
    flac: { codec: "flac", additionalOptions: ["-compression_level", "9"] },
  };

  const { codec, additionalOptions = [] } = formatConfig[outputFormat];
  const ffmpegCommand = new Command(
    resourcePath,
    [
      "-loglevel",
      "error", // Sends all errors to stderr
      "-i", // input file
      inputFile,
      "-c:a", // codec:audio Indicates the codec for the audio stream.
      codec,
      ...additionalOptions, // Specific codec settings
      "-vn", // -vn stops ffmpeg from making output a video file and causing errors
      "-y", // Disable prompts
      outputFile,
    ]
  );

  ffmpegCommand.stdout.addListener("data", (data) => {
    console.log("stdout", data);
    // Do something with stdout if needed
  });

  ffmpegCommand.stderr.addListener("data", (data) => {
    console.log("data", data);
    self.postMessage({ type: "stderr", data: data.toString() });
  });

  try {
    const code = await ffmpegCommand.execute();
    console.log("FFMPEG command executed successfully with code:", code);
    self.postMessage({ type: "code", data: code });
    return code;
  } catch (error) {
    console.error("Error executing FFMPEG command:", error);
    throw error;
  }
};

self.addEventListener("message", async (event) => {
  await converterWorker(event.data[0], event.data[1]);
  console.log("Message processed successfully");
});
