/**
 * *folderSelect.tsx
 * Opens a file dialog to select a folder.
 * @param currentFilePath The currently selected file path.
 * @param setFilePath A function to update the selected file path.
 */
import { open } from "@tauri-apps/api/dialog";
import { audioDir } from "@tauri-apps/api/path";

// In the future support copy and pasting source path
// import { readText } from '@tauri-apps/api/clipboard'; Gets the clipboard content as plain text.
// const clipboardText = await readText();

export async function handleSelectFolder({ currentFilePath, setFilePath }:
  { currentFilePath: string; setFilePath: (path: string) => void }): Promise<void> {
  try {
    const defaultPath = currentFilePath || (await audioDir());
    const selectedPath = await open({
      multiple: false,
      recursive: true,
      directory: true,
      defaultPath: defaultPath
    });
    if (!selectedPath) return;
    setFilePath(selectedPath as string);
  } catch (error) {
    console.error("Error selecting folder:", error);
  }
}