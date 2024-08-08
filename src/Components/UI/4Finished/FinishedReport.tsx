import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { listen } from '@tauri-apps/api/event';

interface File {
  inputFile: string;
  outputFile: string;
  outputFormat: string;
  duplicate: boolean;
}

interface FinishedReportProps {
  failedFiles?: File[];
  successfulFiles?: File[];
}

const FinishedReport: React.FC<FinishedReportProps> = () => {
  const { state } = useLocation();
  const initialFailedFiles = state?.failedFiles || [];
  const initialSuccessfulFiles = state?.successfulFiles || [];

  const [failedFiles, setFailedFiles] = useState<File[]>(initialFailedFiles);
  const [successfulFiles, setSuccessfulFiles] = useState<File[]>(initialSuccessfulFiles);
  const [inProgress, setInProgress] = useState<File[]>([]);

  useEffect(() => {
    const unlistenStartedFile = listen('Started-File', (event) => {
      const { file } = event.payload as { file: File };
      setInProgress((prev) => [...prev, file]);
      console.log("Started-File", file);
    });

    const unlistenFileSuccess = listen('File-Success', (event) => {
      const { file } = event.payload as { file: File };
      setSuccessfulFiles((prev) => [...prev, file]);
      setInProgress((prev) => prev.filter((item) => item.inputFile !== file.inputFile));
      console.log("successfulFiles:", file);
    });

    const unlistenFileFailed = listen('File-Failed', (event) => {
      const { file } = event.payload as { file: File };
      setFailedFiles((prev) => [...prev, file]);
      setInProgress((prev) => prev.filter((item) => item.inputFile !== file.inputFile));
      console.log("FailedFiles:", file);
    });

    // Clean up listeners on unmount
    return () => {
      unlistenStartedFile.then((unlisten) => unlisten());
      unlistenFileSuccess.then((unlisten) => unlisten());
      unlistenFileFailed.then((unlisten) => unlisten());
    };
  }, []);

  const InProgress: React.FC<{ inProgress: File[] }> = ({ inProgress }) => (
    <div>
      <h2>In Progress:</h2>
      <ul>
        {inProgress.map((file, index) => (
          <li key={index}>
            Input File: {file.inputFile}, Output File: {file.outputFile}, Format: {file.outputFormat}, Duplicate: {file.duplicate ? 'Yes' : 'No'}
          </li>
        ))}
      </ul>
    </div>
  );

  const FailedFiles: React.FC<{ failedFiles: File[] }> = ({ failedFiles }) => (
    <div>
      <h2>Failed Files:</h2>
      <ul>
        {failedFiles.map((file, index) => (
          <li key={index}>
            Input File: {file.inputFile}, Output File: {file.outputFile}, Format: {file.outputFormat}, Duplicate: {file.duplicate ? 'Yes' : 'No'}
          </li>
        ))}
      </ul>
    </div>
  );

  const SuccessfulFiles: React.FC<{ successfulFiles: File[] }> = ({ successfulFiles }) => (
    <div>
      <h2>Completed Files:</h2>
      <ul>
        {successfulFiles.map((file, index) => (
          <li key={index}>
            Input File: {file.inputFile}, Output File: {file.outputFile}, Format: {file.outputFormat}, Duplicate: {file.duplicate ? 'Yes' : 'No'}
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div>
      <InProgress inProgress={inProgress} />
      <SuccessfulFiles successfulFiles={successfulFiles} />
      <FailedFiles failedFiles={failedFiles} />
    </div>
  );
};

export default FinishedReport;
