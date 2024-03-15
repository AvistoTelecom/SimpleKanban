import { Routes, Route, Navigate } from 'react-router-dom';
import { KanbanPage } from './components/KanbanPage';
import { FunctionComponent } from 'react';
import KanbanPageProvider from './components/context/KanbanPageContext';

export const App: FunctionComponent = () => {
  return (
    <KanbanPageProvider>
      <div className="h-screen flex flex-col">
        <Routes>
          <Route path="/" element={<KanbanPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </KanbanPageProvider>
  );
};
