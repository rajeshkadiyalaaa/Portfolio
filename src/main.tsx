import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { AppGate } from './components/ui/AppGate';
import { ErrorBoundary } from './components/ui/ErrorBoundary';
import './styles/main.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary
      title="Portfolio failed to load"
      message="Something unexpected went wrong. Please reload the page."
    >
      <AppGate>
        <App />
      </AppGate>
    </ErrorBoundary>
  </StrictMode>
);
