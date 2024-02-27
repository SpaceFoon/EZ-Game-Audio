//FilesToConvert.jsx
/**
 * Represents the list of files to be converted.
 * @param {string[]} deduped - Array of unique file names.
 */
interface FilesToConvertProps {
  deduped: string[];
}
import PropTypes from 'prop-types';

const FilesToConvert: React.FC<FilesToConvertProps> = ({deduped}) => {
    const amountOfFiles = deduped.length;
    return (
      <div>
        <fieldset>
        <legend>
            Source Files: {amountOfFiles} files
        </legend>
            <ul>
            {deduped.map((item, index) => (
                <li key={index}>{item}</li>
            ))}
            </ul>
        </fieldset>
    </div>
);
            }
FilesToConvert.propTypes = {
    deduped: PropTypes.array.isRequired,
};

export default FilesToConvert;