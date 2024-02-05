import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import 'bootstrap/dist/css/bootstrap.min.css'

const root = ReactDOM.createRoot(document.getElementById('root'));
const rootmodif = document.getElementById('root');
rootmodif.style.width="100%";
rootmodif.style.backgroundColor = "#282828";

root.render(  
  <>
    <App />
  </>
);
