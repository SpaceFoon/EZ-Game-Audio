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

interface FileEntry {
  name?: string;
  path: string;
  children?: FileEntry[];
}

interface SearchResult {
  deduped: string[];
  removed: string[];
}

async function walk(entries: FileEntry[], fileExtensions: string[], allFiles: string[]): Promise<void> {
  for (const entry of entries) {
    const { name, path, children } = entry;
    if (!children && name && fileExtensions.includes(name.split(".").pop()!.toLowerCase())) {
      allFiles.push(path);
    }
    if (children && children.length > 0) {
      await walk(children, fileExtensions, allFiles);
    }
  }
}

export default async function searchFiles(searchPath: string, fileExtensions: string[]): Promise<SearchResult> {
  try {
    console.log("Search Path:", searchPath);
    console.log("File Extensions:", fileExtensions);

    const allFiles: string[] = [];
    const entries = await readDir(searchPath, { recursive: true });

    await walk(entries, fileExtensions, allFiles);

    console.log("allFiles", allFiles);

    const deduped = await deleteDuplicateFiles(allFiles);

    const removed = allFiles.filter(file => !deduped.includes(file));

    console.log("deduped", deduped);
    console.log("removed", removed);

    return { deduped, removed };
  } catch (error) {
    console.error(error);
    throw new Error("An error occurred during file search.");
  }
}
