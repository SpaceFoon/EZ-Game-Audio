// Finished.jsx

import { Link } from 'react-router-dom';
import FinishedReport from '../Components/UI/4Finished/FinishedReport';
import {isFileBusy} from '../Components/Backend/utils';
const Finished = () => {
  if (!isFileBusy){
      return{

      }
    }
  return (
    
  <>
  {/* list of finished files as they are completed */}
  
    <div className="container"><h2>Finished Screen</h2></div>
    <Link to="/HomePage">Go to HomePage</Link>
    <FinishedReport />
  </>
  );
};

export default Finished;
