//deletes duplicate files with different extname
import { join, dirname, basename, extname } from "@tauri-apps/api/path";

export async function deleteDuplicateFiles(files: string[]): Promise<string[]> {
  const priorityList = ["flac", "wav", "mp3", "m4a", "ogg"];
  console.log("files", files);

  const fileobjs = await Promise.all(
    files.map(async (file) => {
      // console.log("file:", file);
      // console.log("extname:", await extname(file));
      // console.log("basename:", await basename(file, await extname(file)));
      const name = await join(
        await dirname(file),
        await basename(file, await extname(file))
      );
      const ext = await extname(file);

      return [name, ext];
    })
  );

  const uniq = new Map();

  for (const [name, ext] of fileobjs) {
    // console.log("name :>> ", name);
    // console.log("ext :>> ", ext);
    if (!uniq.has(name)) {
      uniq.set(name, ext);
      continue;
    }

    const current = uniq.get(name);
    // console.log("current :>> ", current);
    // console.log("priorityList.indexOf(ext) :>> ", priorityList.indexOf(ext));
    // console.log(
      // "priorityList.indexOf(current) :>> ",
      // priorityList.indexOf(current)
    // );
    // console.log(
      // "priorityList.indexOf(ext) > priorityList.indexOf(current) :>> ",
      // priorityList.indexOf(ext) > priorityList.indexOf(current)
    // );

    if (priorityList.indexOf(ext) < priorityList.indexOf(current)) {
      uniq.set(name, ext);
    }
  }

  // Return an array of file paths
  return Array.from(uniq.entries()).map(([name, ext]) => `${name}${ext}`);
}
// const deleteDuplicateFiles = (files) => {
//   const priorityList = [".ogg", ".mp3", ".m4a", ".wav", ".flac"];
//   const fileobjs = files.map((file) => [
//     join(dirname(file), basename(file, extname(file))),
//     extname(file),
//   ]);

//   const uniq = new Map();

//   for (const [name, ext] of fileobjs) {
//     if (!uniq.has(name)) {
//       uniq.set(name, ext);
//       continue;
//     }

//     const current = uniq.get(name);
//     if (priorityList.indexOf(ext) > priorityList.indexOf(current)) {
//       uniq.set(name, ext);
//     }
//   }
//   return Array.from(uniq.entries()).reduce(
//     (p, c) => [...p, `${c[0]}${c[1]}`],
//     []
//   );
// };
// module.exports = deleteDuplicateFiles;
