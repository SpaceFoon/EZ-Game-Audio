//Output.tsx
//The last page before converting
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import FinalList from '../Components/UI/3Output/FinalList';
import ConvertButton from '../Components/UI/3Output/ConvertButton';
import convertFiles from '../Components/Backend/converterFiles';
import ConflictDialog from '../Components/UI/3Output/ConflictDialog';

const Output = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    let  [conversionList, setConversionList] = useState(state)
    console.log("conversionListO", conversionList);
    
    const [loading, setLoading] = useState(false);
    const [conflicts, setConflicts] = useState([]);
    const [progress, setProgress] = useState([]);
    const [currentConflict, setCurrentConflict] = useState(null);
    const [showDialog, setShowDialog] = useState(false);
    console.log("conflict1", conflicts);
    const updateConversionList = async (updatedConflicts)=>{
        updatedConflicts = conversionList.filter((item) => item.duplicate === true);
        console.log("updatedConflicts",updatedConflicts);
        setConflicts(updatedConflicts);
    }
    useEffect(() => {
        try{
            console.log("cList", conversionList);
            const updatedConflicts = conversionList.filter((item) => item.duplicate === true);
            console.log("updatedConflicts",updatedConflicts);
            
            setConflicts(updatedConflicts);
        } catch {
            console.error("conversion list is null");
        }
    }, [conversionList, state]); 
    const handleProgressUpdate = (update:any) => {
        setProgress((prevState) => ({ ...prevState, ...update }));
    };

    const onResponse = (response, currentFile) => {
        if (!currentFile)return;
    // Perform necessary updates based on the user response
    const updatedList = conversionList.map(item => {
        if (item === currentFile) {
            switch (response) {
                case "Rename":
                console.log("|rename----|");
                    // Update the outputFile property for renaming
                    return { ...item, outputFile: item.outputFile + "(2)",  duplicate: false };
                case "Overwrite":
                    console.log("overwrite----");
                    // Update the duplicate property for overwriting
                    return { ...item, duplicate: false };
                // Handle other response cases as needed
                default:
                    return { item, duplicate: false };
            }
        } else {
            console.log("item not = currentFile");
            
            return item;
        }
    });

    // Set the updated conversionList state
    setConversionList(updatedList);
};
    const handleClick = async () => {
        if (conflicts.length > 0) {
            console.log("Conflicts detected:", conflicts); // Log the detected conflicts
            const updatedConflicts = conversionList.filter((item) => item.duplicate === true);
            console.log("updatedConflicts",updatedConflicts);
        
            setConflicts(updatedConflicts);
            setCurrentConflict(conflicts[0]);
            console.log("Current conflict set:", conflicts[0]); // Log the current conflict set
            conflicts[0].duplicate = false;
            setShowDialog(true);
            console.log("Dialog shown"); // Log that the dialog is shown

            updateConversionList(updatedConflicts);
        } else {
            setLoading(true);
            navigate("/Finished", { state: { conversionList } });
            try {
                const { failedFiles, successfulFiles } = await convertFiles(conversionList, handleProgressUpdate);
                setLoading(false);
                console.log("failed and success", failedFiles, successfulFiles)
                // navigate("/Finished", { state: { failedFiles, successfulFiles } });
            } catch (error) {
                console.error("Error converting audio:", error);
                setLoading(false);
            }
        }
    };

    return (
        <>
            <FinalList
                conversionList={conversionList}
                conflicts={conflicts}
                progress={progress}
            />
            {showDialog && currentConflict ? (
                <ConflictDialog
                    currentConflict={currentConflict}
                    onResponse={onResponse}
                />
            ) : null}
            <div className="container">
                <ConvertButton
                    loading={loading}
                    conflicts={conflicts.length}
                    handleClick={() => handleClick()}
                />
                <Link to="/Finished">(debug)Go to Finished</Link>
            </div>
        </>
    );
};

export default Output;

