//StartButton.jsx
import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";
import searchFiles from '../../Backend/searchFiles';
import Loading from '../Loading';
import { useState } from 'react';

const StartButton = ({filePath, inputType, outputType, isInputTypeEmpty, isOutputTypeEmpty}) => {
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
  inputType: PropTypes.arrayOf(PropTypes.string).isRequired,
  outputType: PropTypes.arrayOf(PropTypes.string).isRequired,
  searchFiles: PropTypes.func,
  isInputTypeEmpty: PropTypes.bool.isRequired,
  isOutputTypeEmpty: PropTypes.bool.isRequired,
};

export default StartButton;