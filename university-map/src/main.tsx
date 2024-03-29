import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import { createTheme, MantineProvider } from '@mantine/core';
import App from './App.tsx';
import '@mantine/core/styles.css';
import '@mantine/carousel/styles.css';
import './index.css';

const theme = createTheme({
  /** Put your mantine theme override here */
});

ReactDOM.render(
  <React.StrictMode>
    <HashRouter>
      <MantineProvider theme={theme}>
        <App />
      </MantineProvider>
    </HashRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
