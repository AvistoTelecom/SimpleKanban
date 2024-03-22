import { LocalStorage } from '../../localStorage';
import { CreateTicket } from '../../model/CreateTicket';
import { Ticket } from '../../model/Ticket';
import { TicketAction } from './TicketAction';

const addTicket = (newTicket: CreateTicket) => {
  LocalStorage.addTicket(newTicket);
  return LocalStorage.getTicketList();
};

const updateTicket = (newTicket: Ticket): Ticket[] => {
  LocalStorage.updadeTicket(newTicket);
  return LocalStorage.getTicketList();
};

const deleteTicket = (ticketId: number): Ticket[] => {
  LocalStorage.deleteTicket(ticketId);
  return LocalStorage.getTicketList();
};

const setTodoToInProgress = (ticketId: number): Ticket[] => {
  LocalStorage.setTodoToInProgress(ticketId);
  return LocalStorage.getTicketList();
};

const setTodoToDone = (ticketId: number): Ticket[] => {
  LocalStorage.setTodoToDone(ticketId);
  return LocalStorage.getTicketList();
};

const setInProgressToTodo = (ticketId: number): Ticket[] => {
  LocalStorage.setInProgressToTodo(ticketId);
  return LocalStorage.getTicketList();
};

const setInProgressToDone = (ticketId: number): Ticket[] => {
  LocalStorage.setInProgressToDone(ticketId);
  return LocalStorage.getTicketList();
};

const setDoneToTodo = (ticketId: number): Ticket[] => {
  LocalStorage.setDoneTicketToTodo(ticketId);
  return LocalStorage.getTicketList();
};

const setDoneToInProgress = (ticketId: number): Ticket[] => {
  LocalStorage.setDoneToInProgress(ticketId);
  return LocalStorage.getTicketList();
};

export const ticketReducer = (
  state: Ticket[],
  action: TicketAction
): Ticket[] => {
  switch (action.type) {
    case 'ADD-TICKET':
      return addTicket(action.payload);
    case 'UPDATE-TICKET':
      return updateTicket(action.payload);
    case 'DELETE-TICKET':
      return deleteTicket(action.payload);
    case 'SET-TODO-TO-INPROGRESS-TICKET':
      return setTodoToInProgress(action.payload);
    case 'SET-TODO-TO-DONE-TICKET':
      return setTodoToDone(action.payload);
    case 'SET-INPROGRESS-TO-TODO-TICKET':
      return setInProgressToTodo(action.payload);
    case 'SET-INPROGRESS-TO-DONE-TICKET':
      return setInProgressToDone(action.payload);
    case 'SET-DONE-TO-TODO-TICKET':
      return setDoneToTodo(action.payload);
    case 'SET-DONE-TO-INPROGRESS-TICKET':
      return setDoneToInProgress(action.payload);
  }
};
