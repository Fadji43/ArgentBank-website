import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './store/store.js';
 
import App from './App';

const root = createRoot(document.getElementById('root'));

root.render(
  <div>
    <Provider store={store}>
        <App />
    </Provider>
  </div>
);
