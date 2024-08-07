
/**
 * @fileoverview This Home page is the start page of the application.
 * @author <NAME>
 */


import { useEffect, useState } from "react";
import { audioDir } from '@tauri-apps/api/path';
import FilePathComponent from '../Components/UI/1Home/FilePathComponent';
import CheckBoxes from '../Components/UI/1Home/CheckBoxes';
import StartButton from "../Components/UI/1Home/StartButton";
import searchFiles from "../Components/Backend/searchFiles";
/**
 * This function is the main component of the application, which is the home page.
 * TODO: add drop zone for files and folders
 * 
 * @returns {JSX.Element}
 */
const HomePage = (): JSX.Element =>{
  //Set buttons to most common audio formats.
  const [currentFilePath, setFilePath] = useState('');
  const [inputType, setInputType] = useState(['mp3', 'wav', 'flac']);
  const [outputType, setOutputType] = useState(['ogg']);
  const [isInputTypeEmpty, setIsInputTypeEmpty] = useState(false);
  const [isOutputTypeEmpty, setIsOutputTypeEmpty] = useState(false);
  useEffect(() => {
    setIsInputTypeEmpty(!inputType || inputType.length === 0);
  }, [inputType]);
 useEffect(() => {
    setIsOutputTypeEmpty(!outputType || outputType.length === 0);
  }, [outputType]);


  // Initialize default file path
  useEffect(() => {
    //Sets default filepath to Windows music folder.
/**
 * This function sets the default filepath to the Windows music folder.
 * @returns {Promise<void>}
 */
    const setInitialFilePath = async (): Promise<void> => {
        try {
          let initialPath = await audioDir();
          setFilePath(initialPath);
        } catch (error) {
          console.error('Error getting initial path:', error);
        }
      };
      setInitialFilePath();
    }, [])

return (
  <>
    <div className="container">
    <div className="container">
      <FilePathComponent currentFilePath={currentFilePath} setFilePath = {setFilePath}/>
    </div>
 <div className="container">
    <CheckBoxes
      inputType={inputType}
      outputType={outputType}
      setInputType={setInputType}
      setOutputType={setOutputType}
    />
</div>
    <div className="container">
    <StartButton
    searchFiles={searchFiles}
      filePath={currentFilePath}
      inputType={inputType}
      outputType={outputType}
      isInputTypeEmpty={isInputTypeEmpty}
      isOutputTypeEmpty={isOutputTypeEmpty}
    />
    </div>
    </div>
  </>
);
}

export default HomePage

