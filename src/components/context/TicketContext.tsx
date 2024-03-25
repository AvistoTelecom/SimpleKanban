import { FunctionComponent, ReactNode, createContext, useState } from 'react';
import { Ticket } from '../../model/Ticket';
import { LocalStorage } from '../../localStorage';
import { CreateTicket } from '../../model/CreateTicket';

export type TicketContextType = {
  ticketList: Ticket[];
  addTicket: (ticket: CreateTicket) => void;
  deleteTicket: (id: string) => void;
  updateTicket: (ticket: Ticket) => void;

  setTodoTicketToInProgress: (id: string) => void;
  setTodoTicketToDone: (id: string) => void;

  setInProgressTicketToDone: (id: string) => void;
  setInProgressTicketToTodo: (id: string) => void;

  setDoneTicketToInProgress: (id: string) => void;
  setDoneTicketToTodo: (id: string) => void;
};

const todoTicketListDefault = [
  {
    id: '1',
    name: 'Truc à faire',
    creationDate: new Date(),
    startDate: new Date(),
    storyPoint: 1,
    tagName: 'tag1',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas quis orci orci. Ut euismod felis risus, sed euismod tellus luctus ac. Suspendisse interdum lacinia tortor. Aliquam in nibh vulputate, mattis odio pretium, sollicitudin ligula. Fusce tempor imperdiet tempus. Sed euismod in mauris vel tempus. Maecenas rhoncus tortor vitae turpis varius, sed porttitor lorem viverra. Fusce ultricies vel lorem efficitur vestibulum.',
    blocked: false,
  },
  {
    id: '2',
    name: 'Un autre truc à faire',
    creationDate: new Date(),
    storyPoint: 5,
    assigneId: '1',
    tagName: 'tag2',
    description: 'Description',
    blocked: false,
  },
  {
    id: '3',
    name: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaprout',
    creationDate: new Date(),
    storyPoint: 2,
    assigneId: '2',
    tagName: 'taaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaag',
    description: '',
    blocked: false,
  },
  {
    id: '4',
    name: 'Todo',
    creationDate: new Date(),
    storyPoint: 2,
    assigneId: '2',
    description: '',
    blocked: false,
  },
  {
    id: '5',
    name: 'Todo',
    creationDate: new Date(),
    storyPoint: 2,
    assigneId: '2',
    description: '',
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
}> = ({ children }) => {
  const [ticketList, setTicketList] = useState<Ticket[]>(todoTicketListDefault);

  const addTicket = (ticket: CreateTicket) => {
    const id = LocalStorage.addTicket(ticket);
    const newTicket = LocalStorage.getTicket(id);
    if (!newTicket) {
      return;
    }
    setTicketList((ticketList) => [...ticketList, newTicket]);
  };

  const deleteTicket = (id: string) => {
    LocalStorage.deleteTicket(id);
    setTicketList((ticketList) =>
      ticketList.filter((ticket) => ticket.id !== id)
    );
  };

  const updateTicket = (ticket: Ticket) => {
    LocalStorage.updadeTicket(ticket);
    const ticketIndex = ticketList.findIndex(
      (savedTicket) => savedTicket.id === ticket.id
    );
    setTicketList(ticketList.with(ticketIndex, ticket));
  };

  const setDoneTicketToInProgress = (id: string) => {
    LocalStorage.setDoneToInProgress(id);
    const ticket = LocalStorage.getInProgressTicket(id);
    if (!ticket) {
      return;
    }
    const ticketIndex = ticketList.findIndex(
      (savedTicket) => savedTicket.id === id
    );
    setTicketList((ticketList) => ticketList.with(ticketIndex, ticket));
  };

  const setDoneTicketToTodo = (id: string) => {
    LocalStorage.setDoneTicketToTodo(id);
    const ticket = LocalStorage.getTodoTicket(id);
    if (!ticket) {
      return;
    }
    const ticketIndex = ticketList.findIndex(
      (savedTicket) => savedTicket.id === id
    );
    setTicketList((ticketList) => ticketList.with(ticketIndex, ticket));
  };

  const setInProgressTicketToDone = (id: string) => {
    LocalStorage.setInProgressToDone(id);
    const ticket = LocalStorage.getDoneTicket(id);
    if (!ticket) {
      return;
    }
    const ticketIndex = ticketList.findIndex(
      (savedTicket) => savedTicket.id === id
    );
    setTicketList((ticketList) => ticketList.with(ticketIndex, ticket));
  };

  const setInProgressTicketToTodo = (id: string) => {
    LocalStorage.setInProgressToTodo(id);
    const ticket = LocalStorage.getTodoTicket(id);
    if (!ticket) {
      return;
    }
    const ticketIndex = ticketList.findIndex(
      (savedTicket) => savedTicket.id === id
    );
    setTicketList((ticketList) => ticketList.with(ticketIndex, ticket));
  };

  const setTodoTicketToDone = (id: string) => {
    LocalStorage.setTodoToDone(id);
    const ticket = LocalStorage.getDoneTicket(id);
    if (!ticket) {
      return;
    }
    const ticketIndex = ticketList.findIndex(
      (savedTicket) => savedTicket.id === id
    );
    setTicketList((ticketList) => ticketList.with(ticketIndex, ticket));
  };

  const setTodoTicketToInProgress = (id: string) => {
    LocalStorage.setTodoToInProgress(id);
    const ticket = LocalStorage.getInProgressTicket(id);
    if (!ticket) {
      return;
    }
    const ticketIndex = ticketList.findIndex(
      (savedTicket) => savedTicket.id === id
    );
    setTicketList((ticketList) => ticketList.with(ticketIndex, ticket));
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
