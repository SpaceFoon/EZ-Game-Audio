// ConvertButton.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import convertFiles from '../../Backend/converterFiles.ts';
import Loading from '../Loading';
import DuplicateWarning from './DuplicateWarning';

interface ConversionFile {

    inputFile: string;
    outputFile: string;
    duplicate?: boolean;
}

interface Props {
    conversionList: ConversionFile[];
}

const ConvertButton: React.FC<Props> = ({ conversionList }) => {
    console.warn("conversionList", conversionList);
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(false);
    const [conflicts, setConflicts] = useState<number>(0);
    const [failedFiles, setFailedFiles] = useState<ConversionFile[]>([]);
    const [finished, setFinished] = useState<boolean>(false);

    const handleClick = async () => {
        if (conflicts > 0) {
            // Handle conflicts if there are any
            return <DuplicateWarning />;
        } else {
            setLoading(true);
            try {
                await convertFiles(conversionList);
                setLoading(false);
                setFailedFiles(failedFiles);
                setFinished(finished);
                navigate("/Finished", { state: { failedFiles, finished } });
            } catch (error) {
                console.error("Error converting audio:", error);
                setLoading(false);
            }
        }
    };

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

ConvertButton.propTypes = {
    // settings: PropTypes.object.isRequired,
    conversionList: PropTypes.array.isRequired,
};

export default ConvertButton;

// const ConvertButton = ({ conversionList }) => {
//     const [conflicts, setConflicts] = useState(0);
//     const [loading, setLoading] = useState(false);
//     const [conflictRefs, setConflictRefs] = useState([]);
//     const navigate = useNavigate();
//     const firstConflictRef = useRef(null);

//   const conflictRef = useRef(null);

// useEffect(() => {
//     const newConflicts = conversionList.reduce((acc, file) => file.duplicate ? acc + 1 : acc, 0);
//     setConflicts(newConflicts);

//     const newConflictRefs = Array(conversionList.length).fill(conflictRef);
//     setConflictRefs(newConflictRefs);
// }, [conversionList]);

// useEffect(() => {
//   const newConflictRefs = Array(conversionList.length).fill(useRef(null));
// setConflictRefs(newConflictRefs);
//     }, [conversionList]);

//     console.log("number of conflicts: ", conflicts);

//     const handleClick = async () => {
//         setLoading(true);
//         ConvertButton(conversionList)
//         await convertAudio(conversionList);
//         setLoading(false);
//     }

//     return (
//         <div>
//             {loading ? (
//                 <Loading />
//             ) : (
//                 <button disabled={conflicts > 0} onClick={handleClick}>
//                     {conflicts > 0 ? 'Handle Conflicts' : 'Convert'}
//                 </button>
//             )}
//         </div>
//     );
// };
// export default ConvertButton;
// const ConvertButton = ({ conversionList = [] }) => {
//     const [conflicts, setConflicts] = useState(0);
//     const [loading, setLoading] = useState(false);
//     const [conflictRefs, setConflictRefs] = useState([]);
//     const navigate = useNavigate();
//     const firstConflictRef = useRef(null);

//  useEffect(() => {
//         if (!loading) {
//         navigate("/Finished");
//     }
// }, [loading]);
//         const newConflicts = conversionList.reduce((acc, file) => file.duplicate ? acc + 1 : acc, 0);
//         setConflicts(newConflicts);

//         // Create a ref for each conflict and store these refs in the state
//         const newConflictRefs = conversionList.map(() => useRef(null));
//         setConflictRefs(newConflictRefs);
//     }, [conversionList]);
//     console.log("number of conflicts: ", conflicts);

//     setLoading(true);
//     await convertAudio(conversionList);
//     setLoading(false);

//  return (
//         <div>
//             {loading ? (
//                 <Loading />
//             ) : (
//                 <button disabled={conflicts > 0} onClick={handleClick}>
//                     {conflicts > 0 ? 'Handle Conflicts' : 'Convert'}
//                 </button>
//             )}
//             {conversionList.map((file, index) => (
//                 <div key={index} ref={conflictRefs[index]}>
//                     {/* Render the file */}
//                 </div>
//             ))}
//         </div>
//     );
// };
// PropTypes.ConvertButton = {
//     conversionList: PropTypes.arrayOf(PropTypes.shape({
//         inputFile: PropTypes.string.isRequired,
//         outputFile: PropTypes.string.isRequired,
//         duplicate: PropTypes.bool
//     })).isRequired
// };

// export default ConvertButton;