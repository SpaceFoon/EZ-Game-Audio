/**
 * Output.jsx
 * Output component for the entire application.
 * @param conversionList - list of conversion jobs to be done
 */

import { Link, useLocation } from 'react-router-dom';
import FinalList from '../Components/UI/3Output/FinalList';
import ConvertButton from '../Components/UI/3Output/ConvertButton';

interface ConversionJob {
  inputFile: string;
  outputFile: string;
}

interface ConversionFile {
  conversionList: ConversionJob[];
}
interface SettingsProps {
  filePath: string;
  inputType: string;
  outputType: string;
}
const Output: React.FC<SettingsProps> = () => {
  const { state } = useLocation();
  const { conversionList } = state as ConversionFile;

  console.log('conversionList in Output:', conversionList); // Add this line

  return (
    <>
      {/* Final list of jobs to do */}
      <FinalList conversionList={conversionList || []} />

      {/* Go to final confirm button before conversion */}
      <div className="container">
        <ConvertButton 
        // settings={SettingsComponent}
         conversionList={conversionList} />

        <Link to="/Finished">Go to Finished</Link>
      </div>
    </>
  );
};

export default Output;
