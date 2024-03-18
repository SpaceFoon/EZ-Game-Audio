//ConflictDialog.tsx
//Popup to handle file name conflicts
import { Modal, Button } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

interface ConflictDialogProps {
    currentConflict: any; 
    onResponse: Function; 
}

const ConflictDialog: React.FC<ConflictDialogProps> = ({ currentConflict, onResponse  }) => {
    let [opened, { close }] = useDisclosure(true);
 const handleResponse = async (response: string) => {
     console.log("response",response)
        if (response === 'Close'){
            close();
        }else{
        await onResponse(response, currentConflict);
        close();
        } // Call the parent component's response handler with the selected response
        
    };

    return (
        <Modal
            opened={opened}
            title={`File Name Conflict: ${currentConflict.outputFile}`} // Use inputFile property for the title
            size="auto"
            onClose={close}
            transitionProps={{ transition: 'fade', duration: 200 }}
            overlayProps={{
                backgroundOpacity: 0.55,
                blur: 3,
            }}
        >
            <p>{`${currentConflict.outputFile} already exists. How do you want to handle this conflict?`}</p>
            <Button onClick={() => handleResponse('Overwrite')} variant="outline" color="red">
                Overwrite
            </Button>
            {/* <Button onClick={() => handleResponse('OverwriteAll')} variant="outline" color="red">
                Overwrite All
            </Button> */}
            <Button onClick={() => handleResponse('Rename')} variant="outline" color="blue">
                Rename
            </Button>
            {/* <Button onClick={() => handleResponse('RenameAll')} variant="outline" color="blue">
                Rename All
            </Button> */}
            <Button onClick={() => handleResponse('Close')} variant="outline">
                Cancel
            </Button>
        </Modal>
    );
};

export default ConflictDialog;
