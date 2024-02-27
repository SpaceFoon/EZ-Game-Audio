import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import createConversionList from '../../Backend/createConversionList';
import Loading from '../Loading';

interface Settings {
  filePath: string;
  inputType: string[];
  outputType: string[];
}
interface NextButtonProps {
  settings: Settings;
  deduped: string[];
}

const NextButton: React.FC<NextButtonProps> = ({ settings, deduped }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);

  const handleClick = async () => {
    setLoading(true);
    const newConversionList = await createConversionList(settings, deduped);
    navigate("/Output", { state: { conversionList: newConversionList } });
    setLoading(false);
  };

  return (
    <div>
      {loading ? <Loading /> : (
        <button onClick={handleClick}>
          Next
        </button>
      )}
    </div>
  );
};

NextButton.propTypes = {
  settings: PropTypes.exact({
    filePath: PropTypes.string.isRequired,
    inputType: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    outputType: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  }).isRequired,
  deduped: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
};

export default NextButton;
