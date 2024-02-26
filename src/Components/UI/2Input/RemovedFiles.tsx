// RemovedFiles.jsx
// List of files that were removed from the deduped list
import PropTypes from 'prop-types';

interface Props {
    removed: string[]; // Define the type of the removed prop as an array of strings
}

const RemovedFiles: React.FC<Props> = ({ removed }) => {
    const amountOfFiles = removed.length;
    if (removed){
    return (
        <div className='titles'>
            <fieldset>
                <legend>Duplicate Files Detected Not Converting: {amountOfFiles} files</legend>
            <ul>
                {removed.map((file, index) => (
                    <li key={index}>{file}</li>
                ))}
            </ul>
            </fieldset>
        </div>
    );
    }else return;
};

RemovedFiles.propTypes = {
    removed: PropTypes.array.isRequired
};

export default RemovedFiles;
