import { FunctionComponent, ReactNode, createContext, useState } from 'react';
import { Ticket } from '../../model/Ticket';
import { LocalStorageUtil } from '../../localStorage';

export type TicketContextType = {
  ticketList: Ticket[];
  addTicket: (ticket: Ticket) => void;
  deleteTicket: (id: number) => void;
  updateTicket: (ticket: Ticket) => void;

  setTodoTicketToInProgress: (id: number) => void;
  setTodoTicketToDone: (id: number) => void;

  setInProgressTicketToDone: (id: number) => void;
  setInProgressTicketToTodo: (id: number) => void;

  setDoneTicketToInProgress: (id: number) => void;
  setDoneTicketToTodo: (id: number) => void;
};

const defaultTicketList: Ticket[] = [
  {
    id: 1,
    name: 'ticket',
    creationDate: new Date(),
    storyPoint: 0,
    assigneId: null,
    tagName: null,
    description: 'description',
    parentId: null,
    childId: null,
    blocked: false,
  },
];

export const TicketContext = createContext<TicketContextType>({
  ticketList: [],
  addTicket: () => {},
  deleteTicket: () => {},
  updateTicket: () => {},
  setDoneTicketToInProgress: () => {},
  setDoneTicketToTodo: () => {},
  setInProgressTicketToDone: () => {},
  setInProgressTicketToTodo: () => {},
  setTodoTicketToDone: () => {},
  setTodoTicketToInProgress: () => {},
});

export const TicketContextProvider: FunctionComponent<{
  children: ReactNode;
}> = () => {
  //todo mettre localStorage get ticket list ici
  const [ticketList, setTicketList] = useState<Ticket[]>(defaultTicketList);

  const addTicket = (ticket: Omit<Ticket, 'id'>) => {
    const newTicket = {
      ...ticket,
      id: 5,
    };
    setTicketList((ticketList) => [...ticketList, newTicket]);
    LocalStorageUtil.addTicket(ticket);
  };

  const deleteTicket = (id: number) => {
    LocalStorageUtil.deleteTicket(id);
  };

  const updateTicket = (ticket: Ticket) => {
    LocalStorageUtil.updadeTicket(ticket);
  };

  const setDoneTicketToInProgress = (id: number) => {
    const ticket = LocalStorageUtil.getDoneTicket(id);
    if (!ticket) {
      return;
    }
    LocalStorageUtil.setDoneToInProgress(ticket);
  };

  const setDoneTicketToTodo = (id: number) => {
    const ticket = LocalStorageUtil.getDoneTicket(id);
    if (!ticket) {
      return;
    }
    LocalStorageUtil.setDoneTicketToTodo(ticket);
  };

  const setInProgressTicketToDone = (id: number) => {
    const ticket = LocalStorageUtil.getInProgressTicket(id);
    if (!ticket) {
      return;
    }
    LocalStorageUtil.setInProgressToDone(ticket);
  };

  const setInProgressTicketToTodo = (id: number) => {
    const ticket = LocalStorageUtil.getInProgressTicket(id);
    if (!ticket) {
      return;
    }
    LocalStorageUtil.setInProgressToTodo(ticket);
  };

  const setTodoTicketToDone = (id: number) => {
    const ticket = LocalStorageUtil.getInProgressTicket(id);
    if (!ticket) {
      return;
    }
    LocalStorageUtil.setTodoToDone(ticket);
  };

  const setTodoTicketToInProgress = (id: number) => {
    const ticket = LocalStorageUtil.getInProgressTicket(id);
    if (!ticket) {
      return;
    }
    LocalStorageUtil.setTodoToInProgress(ticket);
  };

  return (
    <TicketContext.Provider
      value={{
        ticketList,
        addTicket,
        deleteTicket,
        updateTicket,
        setDoneTicketToInProgress,
        setDoneTicketToTodo,
        setInProgressTicketToDone,
        setInProgressTicketToTodo,
        setTodoTicketToDone,
        setTodoTicketToInProgress,
      }}
    ></TicketContext.Provider>
  );
};
