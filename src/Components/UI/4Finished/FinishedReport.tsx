// import PropTypes from 'prop-types';

interface FinishedReportProps {
    failedFiles?: string[];
    successfulFiles?: string[];
}

import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
// import convertFiles from '../../Backend/converterFiles'
import { listen } from '@tauri-apps/api/event';

const FinishedReport: React.FC = () => {
    const { state } = useLocation();
    const conversionList = state;
    const [failedFiles, setFailedFiles] = useState<string[]>([]);
    const [successfulFiles, setSuccessfulFiles] = useState<string[]>([]);
    const [inProgress, setinProgress] = useState<string[]>([]);
    const handleProgressUpdate = (update: any) => {
        // Handle progress update
    };

// const [updatedConversionList, setUpdatedConversionList] = useState([]);
let [scount, setscount] = useState(0);
let [fcount, setfcount] = useState(0);useEffect((): void => {
    const unlisten = () => {

        listen('Started-File', (event) => {
        const { file, workerCounter, task } = event.payload as { file: any; workerCounter: number; task: string };
        setinProgress((inProgress) => [...inProgress, { ...file }]);
        console.log("Started-File", [file]);
        });

        listen('File-Success', (event) => {
        const { file, workerCounter, task } = event.payload as { file: any; workerCounter: number; task: string };
        setSuccessfulFiles((successfulFiles) => [...successfulFiles, { ...file }]);
        // if (file.outputFile === file.inputFile) setscount(scount++);
        // remove successful file from inProgress
        setinProgress(inProgress.filter((item) => item !== file));
        scount++;
        console.log("successfulFiles:", [file]);
        });

        listen('File-Failed', (event) => {
        const { file, workerCounter, task } = event.payload as { file: any; workerCounter: number; task: string };
        setFailedFiles((FailedFiles) => [...FailedFiles, { ...file }]);
        // if (file.outputFile === file.inputFile) setfcount(fcount++);
        setinProgress(inProgress.filter((item) => item !== file));
        fcount++;
        console.log("FailedFiles:", [file]);
        });

    };

    unlisten();

    // Clean up the listener when the component is unmounted
    return; //() => unlisten();
  }, []); // Empty dependency array ensures the effect runs only once

    const InProgress: React.FC<{ inProgress: string[] }> = ({ inProgress }) => (
        <div>
            <h2>In Progress:</h2>
            <ul>
                {inProgress.map((file, index) => (
                    <li key={index}>{file}</li>
                ))}
            </ul>
        </div>
    );

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

    return (
        <div>
            <FailedFiles failedFiles={failedFiles} />
            <SuccessfulFiles successfulFiles={successfulFiles} />
        </div>
    );
};

export default FinishedReport;
