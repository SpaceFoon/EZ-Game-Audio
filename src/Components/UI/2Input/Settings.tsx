//Settings.jsx
interface setting {

}

const Settings = ({ settings}) => {
  
    let { filePath, inputType, outputType } = settings;

    return (
    <div className="titles">
      <fieldset>
      <legend>Batch Settings:</legend>
      <ul>
        <li>File Path: {filePath}</li>
        <li>Input Type: {inputType}</li>
        <li>Output Type: {outputType}</li>
      </ul>
      </fieldset>
    </div>
  );
};

export default Settings;