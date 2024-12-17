import React from 'react';
import { createRoot } from "react-dom/client";
import App from './App';
import { Provider } from 'react-redux';
import store from './app/store';

const domNode = document.getElementById('root');

if (!domNode) {
  throw new Error("Root element not found. Make sure there is an element with id 'root' in your HTML.");
}
const root = createRoot(domNode)


root.render(
  <Provider store={store}>
    <App/>
  </Provider>
);