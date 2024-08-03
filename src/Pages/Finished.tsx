// Finished.tsx
import { Link } from 'react-router-dom';
import FinishedReport from '../Components/UI/4Finished/FinishedReport';

const Finished = () => {
  return (
    <>
      <div className="container">
        <h2>(debug)Finished Screen</h2>
      </div>
      <FinishedReport/>
      <Link to="/HomePage">(debug)Go to HomePage</Link>
    </>
  );
};

export default Finished;
