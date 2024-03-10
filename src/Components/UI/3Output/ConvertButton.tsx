// ConvertButton.jsx
import PropTypes from 'prop-types';
import Loading from '../Loading';



    
const ConvertButton:any = ( {loading, conflicts, handleClick} ) => {
    console.log("loading", loading);
              console.log("conflicts", conflicts)

    return (
        <div>
            {loading ? (
                <Loading />
            ) : (
                <button disabled={conflicts > 0} onClick={handleClick}>
                    {conflicts > 0 ? 'Handle Conflicts' : 'Convert'}
                </button>
            )}
        </div>
    );
};

// ConvertButton.propTypes = {
//     // settings: PropTypes.object.isRequired,
//     loading: PropTypes.bool.isRequired,
// };
export default ConvertButton;
