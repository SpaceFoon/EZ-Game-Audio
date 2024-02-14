
//InputPage.jsx
//import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ScrollArea } from '@mantine/core';
//import { useWindowScroll, useViewportSize } from '@mantine/hooks';
import { useLocation  } from 'react-router-dom';
import Settings from '../Components/UI/2Input/Settings';
import FilesToConvert from '../Components/UI/2Input/FilesToConvert';
import RemovedFiles from '../Components/UI/2Input/RemovedFiles';
import NextButton from '../Components/UI/2Input/NextButton';
// import DuplicateDialog from '../Components/UI/2Input/DuplicateDialog';

const InputPage = () => {
  // const [isDialogOpen, setDialogOpen] = useState(false);
  
  const { state } = useLocation();
  console.log("state", state);
  // // Call this function when you want to open the dialog
  // function openDialog() {
  //   console.log('confirmed')
  //   setDialogOpen(true);
  // }

  // // Call this function when you want to close the dialog
  // function closeDialog() {
  //   console.log('canceled')
  //   setDialogOpen(false);
  // }
  if (state) {
    var { filePath, inputType, outputType, deduped, removed } = state;
    inputType = inputType.join(', ');
    outputType = outputType.join(', ');
    var settings = { filePath, inputType, outputType };
    //console.log("settings",settings);
    //console.log("deduped, removed", deduped, removed);
  } else {
    console.log('State is undefined or null');
  }
 
  //console.log("settings1", {settings})
  // let progress = null
  //console.log("filePath:", filePath);
  //console.log("inputType:", inputType);
  //console.log("outputType:", outputType);

//console.log("Files", files); // log the files array


  // const [scroll, scrollTo] = useWindowScroll();
  // console.log("scroll", scroll);
// function Demo2() {
//   const { height, width } = useViewportSize();
//   return <>Width: {width}, height: {height}</>;
// }
// Demo2()
  return (
    <>
    {/* <DuplicateDialog
        title="File already exists!"
        description="Do you want to overwrite, rename or skip the file?"
     /> */}
      {/* <Box> */}
      <ScrollArea.Autosize type='auto' mah={'80vh'} maw={'100vw'} mx="auto" scrollbarSize={30} offsetScrollbars >
      {/* <div>
        <h2>Step 2</h2>
      </div> */}
      <Settings settings={settings} />
      
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