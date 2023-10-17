import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './components/App';
import Loading from './components/Loading';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Suspense fallback={<div className='h-screen bg-red-200'><Loading /></div>}>
    <App />
  </Suspense>
);
