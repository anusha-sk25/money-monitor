import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BudgetsContexts, BudgetsProvider} from "./contexts/BudgetsContexts"

ReactDOM.render(

  <React.StrictMode>
  <BudgetsProvider>
  <App />
  </BudgetsProvider>
    
  </React.StrictMode>,
  document.getElementById('root')
)



