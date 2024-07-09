import ReactDOM from 'react-dom/client';
import { SimpleKanban } from './simple-kanban.tsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <SimpleKanban />
  </BrowserRouter>
);
