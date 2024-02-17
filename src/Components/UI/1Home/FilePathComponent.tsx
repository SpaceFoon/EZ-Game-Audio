/**
 * FilePathComponent.tsx Renders the file path input field and the button to select a folder.
 * @param {string} filePath - the current file path
 * @param {function} setFilePath - a function to update the file path state
 */

import propTypes from 'prop-types';
import {handleSelectFolder} from '../../Backend/folderSelect'

interface Props {
  filePath: string;
  setFilePath: (filePath: string) => void;
}

const FilePathComponent: React.FC<Props> = ({ filePath, setFilePath}) => {
    const handleSelect = async () => {
      await handleSelectFolder({filePath, setFilePath});
    };
    return(
  <div >
    <fieldset>
      <legend>Source File Path:</legend>
      <input type="text" value={filePath} placeholder="Select Source File Path" readOnly />
      <br />
      <button type="button" onClick={() => handleSelect({filePath, setFilePath})}>
        Select Folder
      </button>
    </fieldset>
  </div>

);}
FilePathComponent.propTypes = {
  filePath: propTypes.string.isRequired,
  setFilePath: propTypes.func.isRequired
};
export default FilePathComponent;