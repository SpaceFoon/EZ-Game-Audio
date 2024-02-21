// ConvertButton.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import convertAudio from '../../Backend/convert.ts.bak';
import Loading from '../Loading';
import DuplicateWarning from './DuplicateWarning';

interface Settings {
    [key: string]: any; // Define the type for settings as needed
}

interface ConversionFile {
    inputFile: string;
    outputFile: string;
    duplicate?: boolean;
}

interface Props {
    settings: Settings;
    conversionList: ConversionFile[];
}

const ConvertButton: React.FC<Props> = ({ settings, conversionList }) => {
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
                await convertAudio(settings, conversionList);
                setLoading(false);
                setFailedFiles(failedFiles);
                setFinished(Finished);
                navigate("/Finished", { state: { failedFiles, Finished } });
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
    settings: PropTypes.object.isRequired,
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