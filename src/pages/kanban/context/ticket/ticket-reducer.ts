import { LocalStorage } from '../../../../utils/localStorage.utils';
import { CreateTicket } from '../../../../types/create-ticket.type';
import { DoneTicket } from '../../../../types/done-ticket.type';
import { InProgressTicket } from '../../../../types/in-progress-ticket.type';
import { Ticket } from '../../../../types/ticket.type';
import { TodoTicket } from '../../../../types/todo-ticket.type';
import { TicketAction } from './ticket-action';

const getTicketList = (): {
  todoList: TodoTicket[];
  inProgressList: InProgressTicket[];
  doneList: DoneTicket[];
} => {
  return {
    todoList: LocalStorage.getTodoTicketList(),
    inProgressList: LocalStorage.getInProgressTicketList(),
    doneList: LocalStorage.getDoneTicketList(),
  };
};

const addTicket = (newTicket: CreateTicket) => {
  LocalStorage.addTicket(newTicket);
  return getTicketList();
};

const updateTicket = (newTicket: Ticket) => {
  LocalStorage.updateTicketsRelations(newTicket);
  LocalStorage.updateTicket(newTicket);
  return getTicketList();
};

const deleteTicket = (ticketId: string) => {
  LocalStorage.deleteTicket(ticketId);
  return getTicketList();
};

const setTodoToInProgress = (ticketId: string, destinationIndex: number) => {
  LocalStorage.setTodoToInProgress(ticketId, destinationIndex);
  return getTicketList();
};

const setTodoToDone = (ticketId: string, destinationIndex: number) => {
  LocalStorage.setTodoToDone(ticketId, destinationIndex);
  return getTicketList();
};

const setInProgressToTodo = (ticketId: string, destinationIndex: number) => {
  LocalStorage.setInProgressToTodo(ticketId, destinationIndex);
  return getTicketList();
};

const setInProgressToDone = (ticketId: string, destinationIndex: number) => {
  LocalStorage.setInProgressToDone(ticketId, destinationIndex);
  return getTicketList();
};

const setDoneToTodo = (ticketId: string, destinationIndex: number) => {
  LocalStorage.setDoneTicketToTodo(ticketId, destinationIndex);
  return getTicketList();
};

const setDoneToInProgress = (ticketId: string, destinationIndex: number) => {
  LocalStorage.setDoneToInProgress(ticketId, destinationIndex);
  return getTicketList();
};

const reorderTodoList = (sourceIndex: number, destinationIndex: number) => {
  LocalStorage.changeTodoTicketPosition(sourceIndex, destinationIndex);
  return getTicketList();
};

const reorderInProgressList = (
  sourceIndex: number,
  destinationIndex: number
) => {
  LocalStorage.changeInProgressTicketPosition(sourceIndex, destinationIndex);
  return getTicketList();
};

const reorderDoneList = (sourceIndex: number, destinationIndex: number) => {
  LocalStorage.changeDoneTicketPosition(sourceIndex, destinationIndex);
  return getTicketList();
};

export const ticketReducer = (
  _state: {
    todoList: TodoTicket[];
    inProgressList: InProgressTicket[];
    doneList: DoneTicket[];
  },
  action: TicketAction
): {
  todoList: TodoTicket[];
  inProgressList: InProgressTicket[];
  doneList: DoneTicket[];
} => {
  switch (action.type) {
    case 'ADD-TICKET':
      return addTicket(action.payload);
    case 'UPDATE-TICKET':
      return updateTicket(action.payload);
    case 'DELETE-TICKET':
      return deleteTicket(action.payload);
    case 'SET-TODO-TO-INPROGRESS-TICKET':
      return setTodoToInProgress(
        action.payload.ticketId,
        action.payload.destinationIndex
      );
    case 'SET-TODO-TO-DONE-TICKET':
      return setTodoToDone(
        action.payload.ticketId,
        action.payload.destinationIndex
      );
    case 'SET-INPROGRESS-TO-TODO-TICKET':
      return setInProgressToTodo(
        action.payload.ticketId,
        action.payload.destinationIndex
      );
    case 'SET-INPROGRESS-TO-DONE-TICKET':
      return setInProgressToDone(
        action.payload.ticketId,
        action.payload.destinationIndex
      );
    case 'SET-DONE-TO-TODO-TICKET':
      return setDoneToTodo(
        action.payload.ticketId,
        action.payload.destinationIndex
      );
    case 'SET-DONE-TO-INPROGRESS-TICKET':
      return setDoneToInProgress(
        action.payload.ticketId,
        action.payload.destinationIndex
      );
    case 'REORDER-TODO-LIST-TICKET':
      return reorderTodoList(
        action.payload.sourceIndex,
        action.payload.destinationIndex
      );
    case 'REORDER-INPROGRESS-LIST-TICKET':
      return reorderInProgressList(
        action.payload.sourceIndex,
        action.payload.destinationIndex
      );
    case 'REORDER-DONE-LIST-TICKET':
      return reorderDoneList(
        action.payload.sourceIndex,
        action.payload.destinationIndex
      );
  }
};
