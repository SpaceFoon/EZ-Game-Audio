import PropTypes from 'prop-types';

const FailedFiles = ({ failedFiles }) => (
    <div>
        <h2>Failed Files:</h2>
        <ul>
            {failedFiles.map((file, index) => (
                <li key={index}>{file}</li>
            ))}
        </ul>
    </div>
);

FailedFiles.propTypes = {
    failedFiles: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const CompletedFiles = ({ completedFiles }) => (
    <div>
        <h2>Completed Files:</h2>
        <ul>
            {completedFiles.map((file, index) => (
                <li key={index}>{file}</li>
            ))}
        </ul>
    </div>
);

CompletedFiles.propTypes = {
    completedFiles: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const FinishedReport = () => {
    const failedFiles = ['file1.txt', 'file2.txt', 'file3.txt'];
    const completedFiles = ['file4.txt', 'file5.txt', 'file6.txt'];

    return (
        <div>
            <FailedFiles failedFiles={failedFiles} />
            <CompletedFiles completedFiles={completedFiles} />
        </div>
    );
};

export default FinishedReport;
