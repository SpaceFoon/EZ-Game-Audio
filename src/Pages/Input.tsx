
//InputPage.jsx
//import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ScrollArea } from '@mantine/core';
//import { useWindowScroll, useViewportSize } from '@mantine/hooks';
import { useLocation  } from 'react-router-dom';
import Settings from '../Components/UI/2Input/SettingsComponent';
import FilesToConvert from '../Components/UI/2Input/FilesToConvert';
import RemovedFiles from '../Components/UI/2Input/RemovedFiles';
import NextButton from '../Components/UI/2Input/NextButton';
// import DuplicateDialog from '../Components/UI/2Input/DuplicateDialog';

const InputPage = () => {

  
  const { state } = useLocation();
  console.log("input state", state);

  if (!state || !state.filePath || !state.inputType || !state.outputType) {
    return <div>Error: Invalid state object</div>;
  }
  // Extracting values from state and formatting them
  const { filePath, inputType, outputType, deduped, removed } = state;
  const settings = {filePath, inputType, outputType}
    //console.log("settings",settings);
    //console.log("deduped, removed", deduped, removed);

  return (
    <>

      <ScrollArea.Autosize type='auto' mah={'80vh'} maw={'100vw'} mx="auto" scrollbarSize={30} offsetScrollbars >
      {/* <div>
        <h2>Step 2</h2>
      </div> */}
      <Settings filePath={filePath} inputType={inputType} outputType={outputType} />
      
      {/* <ScrollArea h={250} offsetScrollbars scrollbarSize={20} scrollHideDelay={500}> */}
        <RemovedFiles removed={removed} />
        {/* </ScrollArea> */}
        
      {/* <ScrollArea h={250} offsetScrollbars scrollbarSize={20} scrollHideDelay={500}> */}
        <FilesToConvert deduped={deduped} />
      {/* </ScrollArea> */}
      {/* <button onClick={() => scrollTo({ y: 0 })}>Scroll to top</button> */}
      </ScrollArea.Autosize>
      

      {/* <div className='inputPageContainer'> */}
        <div className="container">
         <NextButton settings={settings} deduped={deduped} />
        </div>
        {/* <div className="container"><progress value={progress} /></div> */}
        <div className="container"><Link to="/HomePage">Go to HomePage</Link></div>
        <div className="container"><Link to="/Finished">Go to Finished</Link></div>
      {/* </div> */}
      {/* </Box> */}
    </>
  )
}

export default InputPage