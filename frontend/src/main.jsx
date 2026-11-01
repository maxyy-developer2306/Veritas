import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // <-- Yeh import karna zaroori hai
import App from './App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter> {/* <-- Yahan app ko BrowserRouter ke andar wrap karein */}
      <App />
    </BrowserRouter>
  </React.StrictMode>
);