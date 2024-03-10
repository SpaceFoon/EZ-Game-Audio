// Output.jsx
import { Link, useLocation } from 'react-router-dom';
import FinalList from '../Components/UI/3Output/FinalList';
import ConvertButton from '../Components/UI/3Output/ConvertButton';

import convertFiles from '../Components/Backend/converterFiles';
import { useState, useEffect  } from 'react';
import { useNavigate } from 'react-router-dom';
// interface ConversionJob {
//   inputFile: string;
//   outputFile: string;
//   outputFormat: string;
//   duplicate: [];
// }

// interface ConversionFile {
//   conversionList: ConversionJob[];
// }

const Output = () => {
   const { state } = useLocation();
  console.log("state1", state);
  const  conversionList = state;
  console.log("output",conversionList)
  console.log("state2", state);

  const [loading, setLoading] = useState(false);
  const [conflicts, setConflicts] = useState(0);
  // const [duplicateWarnings, setDuplicateWarnings] = useState([]);
  const [progress, setProgress] = useState({});
  // const [failedFiles, setFailedFiles] = useState([]);
  // const [finished, setFinished] = useState(false);

  // useEffect(() => {
  //   // Calculate conflicts and update state
  //   const newConflicts = conversionList.filter(file => file.duplicate).length;
  //   setConflicts(newConflicts);
  // }, [conversionList]);

  const handleProgressUpdate = (update:any) => {
    // Update progress state
    setProgress(prevState => ({ ...prevState, ...update }));
  };

  // const handleDuplicateWarningUpdate = (warning) => {
  //   // Update duplicate warnings state
  //   setDuplicateWarnings(prevWarnings => [...prevWarnings, warning]);
  // };

  const handleClick = async () => {
    if (conflicts > 0) {
      // Handle conflicts
      // For example, set a state to control visibility of DuplicateWarning
      // setDuplicateWarningVisible(true);
    } else {
      setLoading(true);
      try {
        // Pass progress update callback to convertFiles function
        const {failedFiles, successfulFiles} = await convertFiles(conversionList, handleProgressUpdate);
        setLoading(false);
       
        const navigate = useNavigate();
        navigate("/Finished", {state: {failedFiles, successfulFiles}} );
      } catch (error) {
        console.error("Error converting audio:", error);
        setLoading(false);
      }
    }
  };

  return (
    <>
      {/* Final list of jobs to do */}
      <FinalList
        conversionList={conversionList}
        conflicts={conflicts}
        progress={progress}
      />
      {/* Go to final confirm button before conversion */}
      <div className="container">
        <ConvertButton
          loading={loading}
          conflicts={conflicts}
          onClick={handleClick}
        />
        <Link to="/Finished">Go to Finished</Link>
      </div>
    </>
  );
};

export default Output;
