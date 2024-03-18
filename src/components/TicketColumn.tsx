import { FunctionComponent } from 'react';
import { NewTicketButton } from './AddTicketButton';

export const TicketConumn: FunctionComponent = () => {
  return (
    <div className="flex-1 grid grid-rows-[95%_5%] bg-base-200 place-items-center min-w-60 h-full rounded-box">
      Ticket column
      <NewTicketButton onClick={() => console.log('hello')} />
    </div>
  );
};
