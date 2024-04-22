import { CreateDoneTicket } from '../types/create-done-ticket.type';
import { CreateInProgressTicket } from '../types/create-in-progress-ticket.type';
import { CreateTicket } from '../types/create-ticket.type';
import { CreateTodoTicket } from '../types/create-todo-ticket.type';
import { DoneTicket } from '../types/done-ticket.type';
import { InProgressTicket } from '../types/in-progress-ticket.type';
import { Ticket } from '../types/ticket.type';
import { TodoTicket } from '../types/todo-ticket.type';

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
