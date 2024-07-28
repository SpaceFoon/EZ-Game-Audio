// Finished.jsx
import { Link } from 'react-router-dom';
import FinishedReport from '../Components/UI/4Finished/FinishedReport';

const Finished = () => {



  return (
    
  <>
  {/* if there is an error, popup error window */}
  {/* list of finished files as they are completed */}
  
    <div className="container"><h2>(debug)Finished Screen</h2></div>
    <Link to="/HomePage">(debug)Go to HomePage</Link>
    <FinishedReport />
  </>
  );
};

export default Finished;
