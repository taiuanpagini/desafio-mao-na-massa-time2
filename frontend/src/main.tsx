import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { AppRoutes } from './routes';
import './index.css'
import AppContextProvider from './Context/AppContextProvider';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppContextProvider>
      <RouterProvider router={AppRoutes} />
    </AppContextProvider>
  </StrictMode>,
)
