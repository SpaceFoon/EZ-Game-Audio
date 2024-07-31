// ConvertButton.jsx
import Loading from '../Loading';

interface CBProps {
    loading: boolean;
    conflicts: number;
    handleClick: () => void;
}

const ConvertButton:React.FC<CBProps> = ( {loading, conflicts, handleClick} ) => {
    // console.log("loading", loading);
              console.log("conflicts in ConvertButton", conflicts)
    return (
        <div>
            {loading ? (
                <Loading />
            ) : (
                <button onClick={handleClick}>
                    {conflicts ? 'Handle Next Conflict' : 'Convert Files'}
                </button>
            )}
        </div>
    );
};

export default ConvertButton;
