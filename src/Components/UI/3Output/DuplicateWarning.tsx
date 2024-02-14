import { Alert } from '@mantine/core';

const DuplicateWarning = (conflicts) => {
    if (conflicts > 0){
    return (
        <Alert color="yellow" title="Warning">
            ${conflicts} file &par; already exist!
            Press the &quot;Duplicate&quot; button to choose how to handle them.
        </Alert>
    );
    }else{
        return(
            <></>
        )
    }

};

export default DuplicateWarning;
