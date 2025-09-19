import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import SimpleApp from './SimpleApp.tsx'

// Choose your authentication method:
// USE_SIMPLE_AUTH = true  -> Simple login (no Firebase auth needed)
// USE_SIMPLE_AUTH = false -> Firebase authentication (requires setup)
const USE_SIMPLE_AUTH = false;

const AppToRender = USE_SIMPLE_AUTH ? SimpleApp : App;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppToRender />
  </StrictMode>,
)
