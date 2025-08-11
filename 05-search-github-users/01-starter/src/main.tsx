import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { Toaster } from './components/ui/toaster.tsx';
import { ApolloProvider } from '@apollo/client';
import client from './apolloClient.ts';

// STRICTMODE REMOVED LESSON 53

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <App />
      <Toaster />
    </ApolloProvider>
  </StrictMode>
);
