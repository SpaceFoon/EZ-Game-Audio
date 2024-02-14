// NextButton.jsx

import PropTypes from 'prop-types';
import { useNavigate} from 'react-router-dom';
import { useState } from 'react';
import createConversionList from '../../Backend/createConversionList';
import Loading from '../Loading';

const NextButton = ({ settings, deduped }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    const newConversionList = await createConversionList(settings, deduped);
    navigate("/Output", { state: { conversionList: newConversionList } });
    setLoading(false);
  }

  return (
    <div>
      {loading ? <Loading /> : (
        <button onClick={handleClick}>
          Next
        </button>
      )}
    </div>
  );
}

NextButton.propTypes = {
  settings: PropTypes.object.isRequired,
  deduped: PropTypes.array.isRequired,
};

export default NextButton;