// import PropTypes from 'prop-types';

interface FinishedReportProps {
    failedFiles?: string[];
    successfulFiles?: string[];
}

import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import convertFiles from '../../Backend/converterFiles'

const FinishedReport: React.FC = () => {
    const { state } = useLocation();
    const conversionList = state;
    const [failedFiles, setFailedFiles] = useState<string[]>([]);
    const [successfulFiles, setSuccessfulFiles] = useState<string[]>([]);
    const handleProgressUpdate = (update: any) => {
        // Handle progress update
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.warn("conversionList", conversionList);
                const { failedFiles, successfulFiles } = await convertFiles(conversionList, handleProgressUpdate);
                setFailedFiles(failedFiles);
                setSuccessfulFiles(successfulFiles);
            } catch (error) {
                console.error("Error converting audio:", error);
            }
        };

        fetchData();
    }, []);

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
