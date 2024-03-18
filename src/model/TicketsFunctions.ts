import { DoneTicket } from './DoneTicket';
import { InProgressTicket } from './InProgressTicket';
import { Ticket } from './Ticket';
import { TodoTicket } from './TodoTicket';

export const isInProgressTicket = (
  ticket: Ticket
): ticket is InProgressTicket => {
  return 'starDate' in ticket && !('endDate' in ticket);
};

export const isDoneTicket = (ticket: Ticket): ticket is DoneTicket => {
  return 'endDate' in ticket && 'starDate' in ticket;
};

export const isTodoTicket = (ticket: Ticket): ticket is TodoTicket => {
  return !('starDate' in ticket) && !('endDate' in ticket);
};
