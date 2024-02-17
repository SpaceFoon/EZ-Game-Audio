/**
 * searchFiles.ts
 * Recursively search for files with the given extensions.
 *
 * @param {string} searchPath - The path to search for files.
 * @param {string[]} fileExtensions - The file extensions to search for.
 * @returns {Promise<{ deduped: string[]; removed: string[]; }>} An object containing the deduplicated and removed files.
 */

import { readDir } from "@tauri-apps/api/fs";
import { deleteDuplicateFiles } from "./deleteDups";

interface SearchResult {
  deduped: string[];
  removed: string[];
}
interface SearchFiles{
  searchPath: string;
  fileExtensions: string[];
  entries: object[];
}
interface Path {
  [Symbol.iterator](): IterableIterator<{ name?: string; path?: string; children?: string }>;
  arr: () => IterableIterator<{ name?: string; path?: string; children?: string }>;
}
// interface Path{
//   // name: string;
//   // path: string;
//   // children?: string;
//   arr: () => IterableIterator<{ name: string; path: string; children?: string }>;
//   // arr: any
// }
// export default async function searchFiles({ searchPath, fileExtensions }
//   : SearchFiles): Promise<SearchResult | void> 
//   {
//   try {
//     console.log("Search Path:", searchPath);
//     console.log("File Extensions:", fileExtensions);

//     const allFiles = [];

//     const walk = (arr: Path) => {
      
//       for (const { name, path, children } of arr) {
//         if (
//           !children && name &&
//           fileExtensions.includes(name.split(".").pop().toLowerCase())
//         )
//           allFiles.push(path);
//         if (children && children.length > 0) walk(children);
//       }
//     };

//     const entries = await readDir(searchPath, { recursive: true });
//     for (const entry of entries) {
//       const { name, path, children } = entry;
//       if (
//         !children && name &&
//         fileExtensions.includes(name.split(".").pop().toLowerCase())
//       )
//         allFiles.push(path);

//       if (children && children.length > 0) walk(children);
//     }

//     console.log("allFiles", allFiles);

//     const deduped = await deleteDuplicateFiles(allFiles);

//     const removed = allFiles.filter((file) => !deduped.includes(file));

//     console.log("deduped", deduped);
//     console.log("removed", removed);

//     return { deduped, removed };
//   } catch (error) {
//     console.error(error);
//   }
// }
// import { readDir } from "@tauri-apps/api/fs";
// const { readdirSync, statSync } = require("fs");
// const { join, extname } = require("path");

//Searches for files that meet criteria
const searchFiles = (settings) => {
  const fileExtensions = settings.inputFormats.map((format) => `.${format}`);
  const searchPath = settings.filePath;
  //midi can have .mid or .midi extension
  if (settings.inputFormats.includes("midi")) {
    fileExtensions.push(".mid");
  }

  const allFiles = [];

  const walk = (dir) => {
    const files = readdirSync(dir);

    for (const file of files) {
      const filePath = join(dir, file);
      const stats = statSync(filePath);

      if (stats.isDirectory()) {
        // Recursively walk into subdirectories
        walk(filePath);
      } else {
        // Check if the file has a matching extension
        const fileExtension = extname(file).toLowerCase();
        if (fileExtensions.includes(fileExtension)) {
          allFiles.push(filePath);
        }
      }
    }
  };

  walk(searchPath);
  console.log(
    "\n🔍 Matched", allFiles.length, "Input Files:",
    allFiles
  );

  return Promise.resolve(allFiles);
};

module.exports = searchFiles;
