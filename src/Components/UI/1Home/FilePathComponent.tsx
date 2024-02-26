/**
 * FilePathComponent.tsx Renders the file path input field and the button to select a folder.
 * @param {string} currentFilePath - the current file path
 * @param {function} setFilePath - a function to update the file path state
 */

import propTypes from 'prop-types';
import {handleSelectFolder} from '../../Backend/folderSelect'

interface Props {
  currentFilePath: string;
  setFilePath: (currentFilePath: string) => void;
}

const FilePathComponent: React.FC<Props> = ({ currentFilePath, setFilePath}) => {
    const handleSelect = async () => {
      await handleSelectFolder({currentFilePath, setFilePath});
    };
    return(
  <div >
    <fieldset>
      <legend>Source File Path:</legend>
      <input type="text" value={currentFilePath} placeholder="Select Source File Path" readOnly />
      <br />
      <button type="button" onClick={handleSelect}>
        Select Folder
      </button>
    </fieldset>
  </div>

);}
FilePathComponent.propTypes = {
  currentFilePath: propTypes.string.isRequired,
  setFilePath: propTypes.func.isRequired
};
export default FilePathComponent;