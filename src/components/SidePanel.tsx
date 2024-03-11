import { FunctionComponent } from 'react';
import { TicketForm } from './TicketForm';

export const SidePanel: FunctionComponent = () => {
  return (
    <div className={`w-full bg-base-100 rounded-box p-2`}>
      <TicketForm />
    </div>
  );
};
