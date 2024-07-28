// handlePendingChanges.js
import { ask } from "@tauri-apps/api/dialog";

const handlePendingChanges = ({ pendingChanges, setPendingChanges }) => {
  let didpickall = "";
  const handleResponse = (response, f) => {
    const responseActions = {
      o: () => {},
      oa: () => {
        didpickall = "oa";
      },
      r: () => {
        f.outputFile = f.outputFileCopy;
      },
      ra: () => {
        f.outputFile = f.outputFileCopy;
        didpickall = "ra";
      },
      s: () => {
        f.outputFile = "skipped!";
      },
      sa: () => {
        f.outputFile = "skipped!";
        didpickall = "sa";
      },
    };

    if (didpickall) {
      responseActions[didpickall]();
      console.log(responseActions[didpickall]);
      return;
    }

    responseActions[response]();
    setPendingChanges((prevChanges) => [
      ...prevChanges,
      { inputFile: f.inputFile, outputFile: f.outputFile },
    ]);
  };

  const handleChanges = async () => {
      if (!pendingChanges.length) return;
      for (let f of pendingChanges) {
          // Use the correct property name
          // const { colorScheme, toggleColorScheme } = useMantineColorScheme();
          const response = new Promise((res, rej) => {
              const dialog = document.querySelector('dialog');
              if (!dialog) {
                  return rej('Dialog element not found');
              }
          
              dialog.addEventListener('close', () => res(dialog.returnValue));
              dialog.showModal();
          
              if (rej) return console.error('Broke at const response');
          });
          const question = "ooooooooo"; // Add this line
  
          const result = await response;
          handleResponse(result, f);
  
          console.log(pendingChanges);
          return question;
      }
  };

  
  function handleDialogOption(event) {
    const dialog = document.querySelector('dialog');
    if (dialog) {
      dialog.returnValue = event.target.value;
      dialog.close();
    }
  }
  
  // Call the handleChanges function
  handleChanges();


  return null;
};

export default handlePendingChanges;
