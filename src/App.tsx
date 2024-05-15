import { Routes, Route, Navigate } from 'react-router-dom';
import { FunctionComponent } from 'react';
import { UserContextProvider } from './pages/kanban/context/user/user-context';
import { TagContextProvider } from './pages/kanban/context/tag/tag-context';
import { TicketContextProvider } from './pages/kanban/context/ticket/ticket-context';
import { KanbanPage } from './pages/kanban/kanban-page';
import { ImageContextProvider } from '@pages/kanban/context/image/image-context';

export const App: FunctionComponent = () => {
  return (
    <ImageContextProvider>
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
    </ImageContextProvider>
  );
};
