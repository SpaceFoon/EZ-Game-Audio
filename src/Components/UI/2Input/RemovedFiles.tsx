// RemovedFiles.jsx
// List of files that were removed from the deduped list
import PropTypes from 'prop-types';

const RemovedFiles = ({ removed }) => {
    const amountOfFiles = removed.length;
    if (removed){
    return (
        <div className='titles'>
            <fieldset>
                <legend>Duplicate Files not converting: {amountOfFiles} files</legend>
            <ul>
                {removed.map((file, index) => (
                    <li key={index}>{file}</li>
                ))}
            </ul>
            </fieldset>
        </div>
    );
                }else{
                    return
                }
};

RemovedFiles.propTypes = {
    removed: PropTypes.array.isRequired,
};

export default RemovedFiles;
