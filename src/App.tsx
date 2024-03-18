import { Routes, Route, Navigate } from 'react-router-dom';
import { KanbanPage } from './components/KanbanPage';
import { FunctionComponent } from 'react';
import UsersContextProvider from './components/context/UsersContext';
import TagsContextProvider from './components/context/TagsContext';

export const App: FunctionComponent = () => {
  return (
    <UsersContextProvider>
      <TagsContextProvider>
        <div className="h-screen flex flex-col">
          <Routes>
            <Route path="/" element={<KanbanPage />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </TagsContextProvider>
    </UsersContextProvider>
  );
};
