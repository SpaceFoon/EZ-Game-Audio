//FinalList.jsx
import { Table, ScrollArea } from '@mantine/core';
import PropTypes from 'prop-types';
import {useState} from 'react';
import DuplicateWarning from './DuplicateWarning';

interface ConversionJob {
  inputFile: string;
  outputFile: string;
  outputFormat: string; // Added missing property
  duplicate: [];
}

interface FinalListProps {
  conversionList: ConversionJob[];
  conflicts: any; // Adjust type if needed
  progress: any; // Adjust type if needed
}

const FinalList: React.FC<FinalListProps> = ({ conversionList, conflicts, progress }) => {
    console.log("finallist",conversionList)

  const [clipPaths, setClipPaths] = useState(false);

  const toggleClipPaths = () => {
    setClipPaths(!clipPaths);
  };

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
            {conversionList.map((file:any, index:any) => (
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
