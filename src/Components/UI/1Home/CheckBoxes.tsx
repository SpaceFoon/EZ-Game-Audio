/**
 * checkBoxes.tsx handles the input and output checkboxes
 * @param {string[]} inputType - an array of input file types
 * @param {string[]} outputType - an array of output file types
 * @param {(value: string) => void} setInputType - a function to update the inputType state
 * @param {(value: string) => void} setOutputType - a function to update the outputType state
 */
import { useState } from 'react';
import InputFormatCheckboxComponent from "./InputFormatComponent"
import OutputFormatComponent from "./OutputFormatComponent"

const CheckBoxes = ({inputType, outputType, setInputType, setOutputType}) => {
const [allInputsChecked, setAllInputsChecked] = useState(false);
const [allOutputChecked, setAllOutputChecked] = useState(false);

const handleAllInputsChange = () => {
  if (allInputsChecked) {
    setInputType([]);
  } else {
    setInputType(['mp3', 'wav', 'flac', 'm4a', 'ogg', 'midi']);
  }
  setAllInputsChecked(!allInputsChecked);
};

/**
   * @param {string[]} value - a file type to add or remove from the inputType state
   */
  const handleInputChange = (value:[]) => {
    console.log('file type change:', value);
    setInputType((current:[]) =>
      current.includes(value) ? current.filter((x) => x !== value) : [...current, value]
    );
  };
const handleAllOutputChange = () => {
  if (allOutputChecked) {
    setOutputType([]);
  } else {
    setOutputType(['mp3', 'wav', 'flac', 'm4a', 'ogg']);
  }
  setAllOutputChecked(!allOutputChecked);
};
 /**
   * @param {string[]} value - a file type to add or remove from the outputType state
   */
  const handleOutputChange = (value) => {
    console.log('output type change:', value);
    setOutputType((current) =>
      current.includes(value) ? current.filter((x) => x !== value) : [...current, value]
    );
  };
// if no input type is selected, flash input box red
const isInputTypeEmpty = inputType.length;

// if no output type is selected, flash output box red
const isOutputTypeEmpty = outputType.length;

if (isInputTypeEmpty <= 0) {
  console.log('No input type selected');
  
}
if (isOutputTypeEmpty <= 0) {
  console.log('No output type selected');
}


return (  
    <>   
       <fieldset>
          <legend>Source Formats:</legend>
     <InputFormatCheckboxComponent
            label="All"
            value="all"
            checked={allInputsChecked}
            onChange={handleAllInputsChange} />
          <InputFormatCheckboxComponent
            label="MP3"
            value="mp3"
            checked={inputType.includes('mp3')}
            onChange={handleInputChange} />
          <InputFormatCheckboxComponent
            label="WAV"
            value="wav"
            checked={inputType.includes('wav')}
            onChange={handleInputChange} />
          <InputFormatCheckboxComponent
            label="FLAC"
            value="flac"
            checked={inputType.includes('flac')}
            onChange={handleInputChange} />
          <InputFormatCheckboxComponent
            label="M4A"
            value="m4a"
            checked={inputType.includes('m4a')}
            onChange={handleInputChange} />
          <InputFormatCheckboxComponent
            label="OGG"
            value="ogg"
            checked={inputType.includes('ogg')}
            onChange={handleInputChange} />
          <InputFormatCheckboxComponent
            label="MIDI"
            value="midi"
            checked={inputType.includes('midi')}
            onChange={handleInputChange} />
        </fieldset>

        <fieldset>
          <legend>
            Output Formats:
          </legend>
          <OutputFormatComponent
            label="All"
            value="all"
            checked={allOutputChecked}
            onChange={handleAllOutputChange} />
          <OutputFormatComponent
            label="OGG"
            value="ogg"
            checked={outputType.includes('ogg')}
            onChange={handleOutputChange} />
          <OutputFormatComponent
            label="M4A"
            value="m4a"
            checked={outputType.includes('m4a')}
            onChange={handleOutputChange} />
          <OutputFormatComponent
            label="WAV"
            value="wav"
            checked={outputType.includes('wav')}
            onChange={handleOutputChange} />
          <OutputFormatComponent
            label="FLAC"
            value="flac"
            checked={outputType.includes('flac')}
            onChange={handleOutputChange} />
          <OutputFormatComponent
            label="MP3"
            value="mp3"
            checked={outputType.includes('mp3')}
            onChange={handleOutputChange} />
        </fieldset>
        </>  
)
}

export default CheckBoxes;