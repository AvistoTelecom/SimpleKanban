import { LocalStorage } from '../../localStorage';
import { CreateTicket } from '../../model/CreateTicket';
import { DoneTicket } from '../../model/DoneTicket';
import { InProgressTicket } from '../../model/InProgressTicket';
import { Ticket } from '../../model/Ticket';
import { TodoTicket } from '../../model/TodoTicket';
import { TicketAction } from './TicketAction';

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

const moveTodoToInProgress = (ticketId: string, destinationIndex: number) => {
  LocalStorage.setTodoToInProgress(ticketId, destinationIndex);
  return getTicketList();
};

const moveTodoToDone = (ticketId: string, destinationIndex: number) => {
  LocalStorage.setTodoToDone(ticketId, destinationIndex);
  return getTicketList();
};

const moveInProgressToTodo = (ticketId: string, destinationIndex: number) => {
  LocalStorage.setInProgressToTodo(ticketId, destinationIndex);
  return getTicketList();
};

const moveInProgressToDone = (ticketId: string, destinationIndex: number) => {
  LocalStorage.setInProgressToDone(ticketId, destinationIndex);
  return getTicketList();
};

const moveDoneToTodo = (ticketId: string, destinationIndex: number) => {
  LocalStorage.setDoneTicketToTodo(ticketId, destinationIndex);
  return getTicketList();
};

const moveDoneToInProgress = (ticketId: string, destinationIndex: number) => {
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
    case 'MOVE-TODO-TO-INPROGRESS-TICKET':
      return moveTodoToInProgress(
        action.payload.ticketId,
        action.payload.destinationIndex
      );
    case 'MOVE-TODO-TO-DONE-TICKET':
      return moveTodoToDone(
        action.payload.ticketId,
        action.payload.destinationIndex
      );
    case 'MOVE-INPROGRESS-TO-TODO-TICKET':
      return moveInProgressToTodo(
        action.payload.ticketId,
        action.payload.destinationIndex
      );
    case 'MOVE-INPROGRESS-TO-DONE-TICKET':
      return moveInProgressToDone(
        action.payload.ticketId,
        action.payload.destinationIndex
      );
    case 'MOVE-DONE-TO-TODO-TICKET':
      return moveDoneToTodo(
        action.payload.ticketId,
        action.payload.destinationIndex
      );
    case 'MOVE-DONE-TO-INPROGRESS-TICKET':
      return moveDoneToInProgress(
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
