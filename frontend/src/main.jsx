import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import CartProvider from './components/contextAPI.jsx'
import { Provider } from 'react-redux'
import store from './ReduxStore/store.js'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <CartProvider>
      <App />
    </CartProvider>
    </Provider>
  </StrictMode>
  
)
