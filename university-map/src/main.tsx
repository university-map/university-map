import React from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { createTheme, MantineProvider } from '@mantine/core';
import App from './App.tsx';
import '@mantine/core/styles.css';
import '@mantine/carousel/styles.css';
import './index.css';

const theme = createTheme({
  /** Put your mantine theme override here */
});

const root = document.getElementById('root');
if (!root) {
  throw new Error('Root element #root not found');
}

createRoot(root).render(
  <React.StrictMode>
    <HashRouter>
      <MantineProvider theme={theme}>
        <App />
      </MantineProvider>
    </HashRouter>
  </React.StrictMode>
);
