// import React from "react";
// import ReactDOM from "react-dom/client";
// import App from "./App";
// import "./styles.css";

// ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
// );
import React 
//,{ useState } 
from "react";
import ReactDOM from "react-dom/client";
import { MantineProvider
  // , createTheme
 } from '@mantine/core';
// other css files are required only if
// you are using components from the corresponding package
import '@mantine/core/styles.css';
// import '@mantine/hooks/styles.css';
// import '@mantine/form/styles.css';
// import '@mantine/dates/styles.css';
import '@mantine/notifications/styles.css';
// import '@mantine/code-highlight/styles.css';
// import '@mantine/tiptap/styles.css';
// import '@mantine/dropzone/styles.css';
// import '@mantine/carousel/styles.css';
// import '@mantine/spotlight/styles.css';
// import '@mantine/modals/styles.css';
// import '@mantine/nprogress/styles.css';

import App from "./App";
import "./styles.css";
import "./App.css";
//import "./App.scss";
//dont think this works anymore
// import ColorSchemeContext from "./Components/UI/ColorSchemeContext";

// const darkTheme = createTheme({

//     colorScheme: 'dark',
//     colors: {
//       // override dark colors here to change them for all components
//       dark: [
//         '#d5d7e0',
//         '#acaebf',
//         '#8c8fa3',
//         '#666980',
//         '#4d4f66',
//         '#34354a',
//         '#2b2c3d',
//         '#1d1e30',
//         '#0c0d21',
//         '#01010a',
//       ],
//     },
// });
// const hackerTheme = createTheme({
//   colorScheme: 'hackerMan',
//     colors: {
//         hacker: [
//         '#d5d7e0',
//         '#acaebf',
//         '#8c8fa3',
//         '#666980',
//         '#4d4f66',
//         '#34354a',
//         '#2b2c3d',
//         '#1d1e30',
//         '#0c0d21',
//         '#01010a',
//         ],
//       }
//   });
// const darkTheme = createTheme({
  
// })
//In order to take advantage of React 18's concurrent features you'll
//need to use the new root API for client rendering.
function AppWrapper() {
 //const [colorScheme, setColorScheme] = useState('dark');

  return (
      <MantineProvider 
      defaultColorScheme='dark'
      >
        <App />
      </MantineProvider>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>
);