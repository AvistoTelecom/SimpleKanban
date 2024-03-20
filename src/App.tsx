import { Routes, Route, Navigate } from 'react-router-dom';
import { KanbanPage } from './components/KanbanPage';
import { FunctionComponent } from 'react';
import UsersContextProvider from './components/context/UsersContext';
import TagsContextProvider from './components/context/TagsContext';
import { TicketContextProvider } from './components/context/TicketContext';

export const App: FunctionComponent = () => {
  return (
    <UsersContextProvider>
      <TagsContextProvider>
        <TicketContextProvider>
          <div className="h-screen flex flex-col scroll-p-1">
            <Routes>
              <Route path="/" element={<KanbanPage />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
        </TicketContextProvider>
      </TagsContextProvider>
    </UsersContextProvider>
  );
};
