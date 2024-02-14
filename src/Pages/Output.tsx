// Output.jsx
import { Link , useLocation} from 'react-router-dom';
import FinalList from '../Components/UI/3Output/FinalList';
import ConvertButton from '../Components/UI/3Output/ConvertButton';
export default function Output () {
       const { state } = useLocation();
       const { conversionList } = state;
console.log('conversionList in Output:', conversionList); // Add this line
    return (
    <>
        {/* Final list of jobs to do */}
          <FinalList conversionList={conversionList}/>

        {/*go to */}
        {/* final confirm button before conversion */}

        <div className="container">
        <ConvertButton conversionList={conversionList}/>
        
        <Link to="/Finished">Go to Finished</Link>
        </div>
    </>
    );
    }