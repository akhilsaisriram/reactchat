import React from 'react';

import './index.css';
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';
import store from './reduxstore/store';
import App from './App';
import { pdfjs } from 'react-pdf'; // Import pdfjs from react-pdf

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<Provider store={store}><App/></Provider>);


