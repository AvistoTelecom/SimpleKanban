import { FunctionComponent } from 'react';
import { TicketColumn } from './TicketColumn';

export const KanbanArea: FunctionComponent = () => {
  return (
    <div className="flex bg-base-100 rounded-box w-full gap-2 p-2 overflow-x-auto">
      <TicketColumn />
      <TicketColumn />
      <TicketColumn />
    </div>
  );
};
