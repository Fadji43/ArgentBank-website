import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './store/store.js';
import { UserProvider } from './userContext.js'; 
import App from './App';

const root = createRoot(document.getElementById('root'));

root.render(
  <div>
    <Provider store={store}>
      <UserProvider>
        <App />
      </UserProvider>
    </Provider>
  </div>
);
