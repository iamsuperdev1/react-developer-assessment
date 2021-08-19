import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import './mock';
import './styles/index.css';
import { BrowserRouter as Router } from "react-router-dom";

/**
 * This file can be ignored, please work in ./components/App.tsx
 */

ReactDOM.render(
  <Router>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Router>
  ,
  document.getElementById('root'),
);
