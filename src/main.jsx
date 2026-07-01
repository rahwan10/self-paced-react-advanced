<<<<<<< HEAD
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
=======
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();
>>>>>>> 54ec02b (feat: query설치 및 프로바이더 씌우기)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>,
);
