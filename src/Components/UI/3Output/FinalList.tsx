//FinalList.jsx
import { Table, ScrollArea } from '@mantine/core';
// import PropTypes from 'prop-types';
import {useState, useEffect} from 'react';
// import DuplicateWarning from './DuplicateWarning';
// import { listen } from '@tauri-apps/api/event';
interface ConversionJob {
  inputFile: string;
  outputFile: string;
  outputFormat: string;
  duplicate: [];
}

interface FinalListProps {
  conversionList: ConversionJob[];
  conflicts: any;
  progress: any;
}

const FinalList: React.FC<FinalListProps> = ({ conversionList, conflicts, progress }) => {
    console.log("finallist",conversionList)
const [updatedConversionList, setUpdatedConversionList] = useState([...conversionList]);
// let [scount, setscount] = useState(0);
// let [fcount, setfcount] = useState(0);
//   useEffect((): void => {
//     const unlisten = () => {
//       listen('Started-File', (event) => {
//         // Update the conversion list when the 'Started-File' event is emitted
//         const { file, workerCounter, task } = event.payload as { file: any; workerCounter: number; task: string };
//         // Update the conversion list based on the received event data
//         setUpdatedConversionList((prevList) => [...prevList, { ...file }]);
//         console.log("Updated conversion list:", [file]);
//       });
//       listen('File-Success', (event) => {
//         // Update the conversion list when the 'File-Success' event is emitted
//         const { file, workerCounter, task } = event.payload as { file: any; workerCounter: number; task: string };
//         // Update the conversion list based on the received event data
//         setUpdatedConversionList((prevList) => [...prevList, { ...file }]);
//         if (file.outputFile === file.inputFile) setscount(scount++);
//         scount++;
//         console.log("Updated conversion list:", [file]);
//       });
//       listen('File-Failed', (event) => {
//         // Update the conversion list when the 'File-Failed' event is emitted
//         const { file, workerCounter, task } = event.payload as { file: any; workerCounter: number; task: string };
//         // Update the conversion list based on the received event data
//         setUpdatedConversionList((prevList) => [...prevList, { ...file }]);
//         if (file.outputFile === file.inputFile) setfcount(fcount++);
//         fcount++;
//         console.log("Updated conversion list:", [file]);
//       });
//     };

//     unlisten();

//     // Clean up the listener when the component is unmounted
//     return; //() => unlisten();
//   }, []); // Empty dependency array ensures the effect runs only once

  const [clipPaths, setClipPaths] = useState(false);

  const toggleClipPaths = () => {
    setClipPaths(!clipPaths);
  };
  const [updatedConflicts, setUpdatedConflicts] = useState<any[]>([]);
  // const [updatedProgress, setUpdatedProgress] = useState<any>({});
// useEffect(() => {
//         // Update internal state whenever props change
//         setUpdatedConflicts(conflicts);
//     }, [conflicts]);

//     useEffect(() => {
//         // Update internal state whenever props change
//         setUpdatedProgress(progress);
//     }, [progress]);
  return (
    <>
      <h2>Output Files:</h2>
      <div className='container'>
        <button onClick={toggleClipPaths}>
          {clipPaths ? 'Show Full Paths' : 'Clip Paths'}
        </button>
      </div>
      <ScrollArea.Autosize type='auto' mah={'70vh'} maw={'100vw'} mx="auto" scrollbarSize={20} offsetScrollbars >
        <Table striped style={{ borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ border: '2px solid #ddd' }}>Input</th>
              <th style={{ border: '2px solid #ddd' }}>Output</th>
            </tr>
          </thead>
          <tbody>
            {/* {Object.keys(conversionList).map */}
            {updatedConversionList.map((file:any, index:any) => (
              <tr key={index} className={file.duplicate ? 'flash' : ''}>
                <td style={{ border: '2px solid #ddd', padding: '4px' }}>
                  {clipPaths ? file.inputFile.replace(/^.*[\\/]/, '') : file.inputFile}
                </td>
                <td style={{ border: '2px solid #ddd', padding: '4px' }}>
                  {clipPaths ? file.outputFile.replace(/^.*[\\/]/, '') : file.outputFile}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </ScrollArea.Autosize>
    </>
  );
};

// FinalList.propTypes = {
//   conversionList: PropTypes.arrayOf(PropTypes.shape({
//     inputFile: PropTypes.string,
//     outputFile: PropTypes.string,
//     duplicate: PropTypes.bool,
//   })).isRequired,
// };

export default FinalList;
