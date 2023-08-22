import ReactDOM from 'react-dom/client';

import { Router } from './components/Router';

import './styles/index.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <Router />
);
