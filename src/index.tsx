import React from 'react';
import { render } from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import buildStore from './redux/store';

const rootElement = document.getElementById('root');
render(
  <React.StrictMode>
    <Router basename={process.env.PUBLIC_URL}>
      <Provider store={buildStore()}>
        <App />
      </Provider>
    </Router>
  </React.StrictMode>,
  rootElement
);
