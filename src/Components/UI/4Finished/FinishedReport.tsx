// import PropTypes from 'prop-types';

interface FinishedReportProps {
    failedFiles?: string[];
    successfulFiles?: string[];
}

const FailedFiles: React.FC<{ failedFiles: string[] }> = ({ failedFiles }) => (
    <div>
        <h2>Failed Files:</h2>
        <ul>
            {failedFiles.map((file, index) => (
                <li key={index}>{file}</li>
            ))}
        </ul>
    </div>
);

const SuccessfulFiles: React.FC<{ successfulFiles: string[] }> = ({ successfulFiles }) => (
    <div>
        <h2>Completed Files:</h2>
        <ul>
            {successfulFiles.map((file, index) => (
                <li key={index}>{file}</li>
            ))}
        </ul>
    </div>
);

const FinishedReport: React.FC<FinishedReportProps> = (failedFiles, successfulFiles) => {
    // const failedFiles: string[] = ['file1.txt', 'file2.txt', 'file3.txt'];
    // const completedFiles: string[] = ['file4.txt', 'file5.txt', 'file6.txt'];


    return (
        <div>
            <FailedFiles failedFiles={failedFiles} />
            <SuccessfulFiles successfulFiles={successfulFiles} />
        </div>
    );
};
// CompletedFiles.propTypes = {
//     completedFiles: PropTypes.arrayOf(PropTypes.string),
// };
// FailedFiles.propTypes = {
//     failedFiles: PropTypes.arrayOf(PropTypes.string),
// };
export default FinishedReport;
