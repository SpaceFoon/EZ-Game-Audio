//Settings.jsx
/**
 * Renders the settings panel for the batch processing tool.
 * @param settings - the current settings for the tool
 */
import React from 'react';

interface SettingsProps {
  filePath: string;
  inputType: string[];
  outputType: string[];
}

const Settings : React.FC<SettingsProps> = ({ filePath, inputType, outputType }) => {
const formattedInputType = Array.isArray(inputType) ? inputType.join(', ') : inputType;
const formattedOutputType = Array.isArray(outputType) ? outputType.join(', ') : outputType;
  return (
    <div className="titles">
      <fieldset>
        <legend>Batch Settings:</legend>
        <ul>
          <li>File Path: {filePath}</li>
          <li>Input Type: {formattedInputType}</li>
          <li>Output Type: {formattedOutputType}</li>
        </ul>
      </fieldset>
    </div>
  );
};

export default Settings ;
