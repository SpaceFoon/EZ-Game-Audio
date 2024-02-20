/**
 * StartButton component
 *
 * @param props component props
 * @param props.filePath file path
 * @param props.inputType input types
 * @param props.outputType output types
 * @param props.isInputTypeEmpty is input type empty
 * @param props.isOutputTypeEmpty is output type empty
 * @returns start button element
 */

import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";
import searchFiles from '../../Backend/searchFiles';
import Loading from '../Loading';
import { useState } from 'react';

interface Props {
  filePath: string;
  inputType: string[];
  outputType: string[];
  isInputTypeEmpty: boolean;
  isOutputTypeEmpty: boolean;
  searchFiles: (filePath: string, inputType: string[]) => Promise<{ deduped: string[]; removed?: string[]; }>;
}
const StartButton: React.FC<Props> = ({
    filePath, inputType, outputType, isInputTypeEmpty, isOutputTypeEmpty}
  ) => {
    console.log('filePath:', filePath);

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const startSourceSearch = async () => {
    setLoading(true);
    console.log("Start Button", filePath, inputType, outputType)
      const { deduped, removed } = await searchFiles(filePath, inputType);
    navigate("/Input", { state:  {filePath, inputType, outputType, deduped, removed} });
    setLoading(false);
  };

  return (

    <button onClick={startSourceSearch} disabled={loading || isInputTypeEmpty || isOutputTypeEmpty}>
      {loading ? <Loading /> : (isInputTypeEmpty || isOutputTypeEmpty ? 'Select types' : 'Start')}
    </button>
  );
};

StartButton.propTypes = {
  filePath: PropTypes.string.isRequired,
  inputType: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  outputType: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  searchFiles: PropTypes.func.isRequired,
  isInputTypeEmpty: PropTypes.bool.isRequired,
  isOutputTypeEmpty: PropTypes.bool.isRequired,
};

export default StartButton;