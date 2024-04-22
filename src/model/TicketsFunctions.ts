import { CreateDoneTicket } from './CreateDoneTicket';
import { CreateInProgressTicket } from './CreateInProgressTicket';
import { CreateTicket } from './CreateTicket';
import { CreateTodoTicket } from './CreateTodoTicket';
import { DoneTicket } from './DoneTicket';
import { InProgressTicket } from './InProgressTicket';
import { Ticket } from './Ticket';
import { TodoTicket } from './TodoTicket';

export const isInProgressTicket = (
  ticket: Ticket
): ticket is InProgressTicket => {
  return 'startDate' in ticket && !('endDate' in ticket);
};

export const isDoneTicket = (ticket: Ticket): ticket is DoneTicket => {
  return 'endDate' in ticket && 'startDate' in ticket;
};

export const isTodoTicket = (ticket: Ticket): ticket is TodoTicket => {
  return !('startDate' in ticket) && !('endDate' in ticket);
};

export const isCreateInProgressTicket = (
  ticket: CreateTicket
): ticket is CreateInProgressTicket => {
  return 'startDate' in ticket && !('endDate' in ticket);
};

export const isCreateDoneTicket = (
  ticket: CreateTicket
): ticket is CreateDoneTicket => {
  return 'endDate' in ticket && 'startDate' in ticket;
};

export const isCreateTodoTicket = (
  ticket: CreateTicket
): ticket is CreateTodoTicket => {
  return !('startDate' in ticket) && !('endDate' in ticket);
};
