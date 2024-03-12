import { Routes, Route, Navigate } from 'react-router-dom';
import { KanbanPage } from './components/KanbanPage';
import { FunctionComponent } from 'react';

export const App: FunctionComponent = () => {
  return (
    <div className="h-screen flex flex-col">
      <Routes>
        <Route path="/" element={<KanbanPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
};
