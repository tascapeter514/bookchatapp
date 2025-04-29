import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import * as Sentry from '@sentry/react'
import store from './store/store.tsx'
import { Provider } from 'react-redux'
import './index.css'
import App from './App.tsx'



Sentry.init({
  dsn: "https://db0d928e2ac562e04c7dd9a414449088@o4509236874641408.ingest.us.sentry.io/4509236879818752",
  integrations: [
    Sentry.browserTracingIntegration(),
  ],
  tracesSampleRate: 1.0, // 1.0 = 100% of transactions (can reduce in production)
  sendDefaultPii: true,
});


createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <StrictMode>
      <App />
    </StrictMode>
  </Provider> 
)
