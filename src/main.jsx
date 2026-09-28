import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

const container = document.getElementById('root')
// The build ships a static snapshot inside #root for crawlers; the live app replaces it.
container.removeAttribute('data-prerendered')

ReactDOM.createRoot(container).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
