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
  LocalStorage.updadeTicket(newTicket);
  return getTicketList();
};

const deleteTicket = (ticketId: string) => {
  LocalStorage.deleteTicket(ticketId);
  return getTicketList();
};

const setTodoToInProgress = (ticketId: string, destinationIndex: number) => {
  LocalStorage.setTodoToInProgress(ticketId);
  const inProgressTicketList = LocalStorage.getInProgressTicketList();
  const sourceIndex = inProgressTicketList.findIndex(
    (currTicket) => currTicket.id === ticketId
  );
  return reorderInProgressList(
    inProgressTicketList
      .toSpliced(sourceIndex, 1)
      .toSpliced(destinationIndex, 0, inProgressTicketList[sourceIndex])
  );
};

const setTodoToDone = (ticketId: string, destinationIndex: number) => {
  LocalStorage.setTodoToDone(ticketId);
  const doneTicketList = LocalStorage.getDoneTicketList();
  const sourceIndex = doneTicketList.findIndex(
    (currTicket) => currTicket.id === ticketId
  );
  return reorderDoneList(
    doneTicketList
      .toSpliced(sourceIndex, 1)
      .toSpliced(destinationIndex, 0, doneTicketList[sourceIndex])
  );
};

const setInProgressToTodo = (ticketId: string, destinationIndex: number) => {
  LocalStorage.setInProgressToTodo(ticketId);
  const todoTicketList = LocalStorage.getTodoTicketList();
  const sourceIndex = todoTicketList.findIndex(
    (currTicket) => currTicket.id === ticketId
  );
  return reorderTodoList(
    todoTicketList
      .toSpliced(sourceIndex, 1)
      .toSpliced(destinationIndex, 0, todoTicketList[sourceIndex])
  );
};

const setInProgressToDone = (ticketId: string, destinationIndex: number) => {
  LocalStorage.setInProgressToDone(ticketId);
  const doneTicketList = LocalStorage.getDoneTicketList();
  const sourceIndex = doneTicketList.findIndex(
    (currTicket) => currTicket.id === ticketId
  );
  return reorderDoneList(
    doneTicketList
      .toSpliced(sourceIndex, 1)
      .toSpliced(destinationIndex, 0, doneTicketList[sourceIndex])
  );
};

const setDoneToTodo = (ticketId: string, destinationIndex: number) => {
  LocalStorage.setDoneTicketToTodo(ticketId);
  const todoTicketList = LocalStorage.getTodoTicketList();
  const sourceIndex = todoTicketList.findIndex(
    (currTicket) => currTicket.id === ticketId
  );
  return reorderTodoList(
    todoTicketList
      .toSpliced(sourceIndex, 1)
      .toSpliced(destinationIndex, 0, todoTicketList[sourceIndex])
  );
};

const setDoneToInProgress = (ticketId: string, destinationIndex: number) => {
  LocalStorage.setDoneToInProgress(ticketId);
  const inProgressTicketList = LocalStorage.getInProgressTicketList();
  const sourceIndex = inProgressTicketList.findIndex(
    (currTicket) => currTicket.id === ticketId
  );
  return reorderInProgressList(
    inProgressTicketList
      .toSpliced(sourceIndex, 1)
      .toSpliced(destinationIndex, 0, inProgressTicketList[sourceIndex])
  );
};

const reorderTodoList = (todoList: Ticket[]) => {
  const inProgressList = LocalStorage.getInProgressTicketList();
  const doneList = LocalStorage.getDoneTicketList();
  const orderedList = todoList.concat(inProgressList).concat(doneList);
  LocalStorage.setTicketList(orderedList);
  return getTicketList();
};

const reorderInProgressList = (inProgressList: Ticket[]) => {
  const todoList = LocalStorage.getTodoTicketList();
  const doneList = LocalStorage.getDoneTicketList();
  const orderedList = todoList.concat(inProgressList).concat(doneList);
  LocalStorage.setTicketList(orderedList);
  return getTicketList();
};

const reorderDoneList = (doneList: Ticket[]) => {
  const todoList = LocalStorage.getTodoTicketList();
  const inProgressList = LocalStorage.getInProgressTicketList();
  const orderedList = todoList.concat(inProgressList).concat(doneList);
  LocalStorage.setTicketList(orderedList);
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
      return reorderTodoList(action.payload);
    case 'REORDER-INPROGRESS-LIST-TICKET':
      return reorderInProgressList(action.payload);
    case 'REORDER-DONE-LIST-TICKET':
      return reorderDoneList(action.payload);
  }
};
