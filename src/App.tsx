import { Routes, Route, Navigate } from 'react-router-dom';
import { KanbanPage } from './components/KanbanPage';
import { FunctionComponent } from 'react';
import { UserContextProvider } from './components/context/UserContext';
import { TagContextProvider } from './components/context/TagContext';
import { TicketContextProvider } from './components/context/TicketContext';

export const App: FunctionComponent = () => {
  return (
    <UserContextProvider>
      <TagContextProvider>
        <TicketContextProvider>
          <div className="h-screen flex flex-col">
            <Routes>
              <Route path="/" element={<KanbanPage />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
        </TicketContextProvider>
      </TagContextProvider>
    </UserContextProvider>
  );
};
