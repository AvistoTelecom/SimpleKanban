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

const deleteTicket = (ticketId: number) => {
  LocalStorage.deleteTicket(ticketId);
  return getTicketList();
};

const setTodoToInProgress = (ticketId: number) => {
  console.log('todo to inprogress');
  console.log(getTicketList());
  LocalStorage.setTodoToInProgress(ticketId);
  console.log(getTicketList());
  return getTicketList();
};

const setTodoToDone = (ticketId: number) => {
  LocalStorage.setTodoToDone(ticketId);
  return getTicketList();
};

const setInProgressToTodo = (ticketId: number) => {
  LocalStorage.setInProgressToTodo(ticketId);
  return getTicketList();
};

const setInProgressToDone = (ticketId: number) => {
  LocalStorage.setInProgressToDone(ticketId);
  return getTicketList();
};

const setDoneToTodo = (ticketId: number) => {
  LocalStorage.setDoneTicketToTodo(ticketId);
  return getTicketList();
};

const setDoneToInProgress = (ticketId: number) => {
  LocalStorage.setDoneToInProgress(ticketId);
  return getTicketList();
};

const reorderTodoList = (
  state: {
    todoList: TodoTicket[];
    inProgressList: InProgressTicket[];
    doneList: DoneTicket[];
  },
  todoList: Ticket[]
) => {
  const orderedList = todoList
    .concat(state.inProgressList)
    .concat(state.doneList);
  LocalStorage.setTicketList(orderedList);
  return getTicketList();
};

const reorderInProgressList = (
  state: {
    todoList: TodoTicket[];
    inProgressList: InProgressTicket[];
    doneList: DoneTicket[];
  },
  inProgressList: Ticket[]
) => {
  console.log('ordering');
  console.log(state);
  console.log(inProgressList);
  const orderedList = state.todoList
    .concat(inProgressList)
    .concat(state.doneList);
  console.log(orderedList);

  LocalStorage.setTicketList(orderedList);
  return getTicketList();
};

const reorderDoneList = (
  state: {
    todoList: TodoTicket[];
    inProgressList: InProgressTicket[];
    doneList: DoneTicket[];
  },
  doneList: Ticket[]
) => {
  const orderedList = state.todoList
    .concat(state.inProgressList)
    .concat(doneList);
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
    case 'REORDER-TODO-LIST-TICKET':
      return reorderTodoList(_state, action.payload);
    case 'REORDER-INPROGRESS-LIST-TICKET':
      console.log('action', action);
      return reorderInProgressList(_state, action.payload);
    case 'REORDER-DONE-LIST-TICKET':
      return reorderDoneList(_state, action.payload);
  }
};
