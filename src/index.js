import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'tachyons/css/tachyons.min.css';
import App from './client/Components/App';

import {
  QueryClient,
  QueryClientProvider,
} from "react-query";

const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient} >
      <App />
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById('root')
);