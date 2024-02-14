import React from 'react';
import ReactDOM from 'react-dom';
import { createTheme, MantineProvider } from '@mantine/core';
import App from './App.tsx';
import '@mantine/core/styles.css';
import './index.css';
import { BrowserRouter } from 'react-router-dom';

const theme = createTheme({
  /** Put your mantine theme override here */
});

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <MantineProvider theme={theme}>
        <App />
      </MantineProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
