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
}> = ({ children }) => {
  const [ticketList, setTicketList] = useState<Ticket[]>(
    LocalStorageUtil.getTicketList()
  );

  const addTicket = (ticket: Omit<Ticket, 'id'>) => {
    const id = LocalStorageUtil.addTicket(ticket);
    const newTicket = LocalStorageUtil.getTicket(id);
    if (newTicket === null) {
      return;
    }
    setTicketList((ticketList) => [...ticketList, newTicket]);
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
    >
      {children}
    </TicketContext.Provider>
  );
};
