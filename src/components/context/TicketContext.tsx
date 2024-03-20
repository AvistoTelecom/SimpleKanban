import { FunctionComponent, ReactNode, createContext, useState } from 'react';
import { Ticket } from '../../model/Ticket';
import { LocalStorage } from '../../localStorage';

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

const todoTicketListDefault = [
  {
    id: 1,
    name: 'Truc à faire',
    creationDate: new Date(),
    storyPoint: 1,
    tagName: 'tag1',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas quis orci orci. Ut euismod felis risus, sed euismod tellus luctus ac. Suspendisse interdum lacinia tortor. Aliquam in nibh vulputate, mattis odio pretium, sollicitudin ligula. Fusce tempor imperdiet tempus. Sed euismod in mauris vel tempus. Maecenas rhoncus tortor vitae turpis varius, sed porttitor lorem viverra. Fusce ultricies vel lorem efficitur vestibulum.',
    blocked: false,
  },
  {
    id: 1,
    name: 'Un autre truc à faire',
    creationDate: new Date(),
    storyPoint: 5,
    assigneId: 1,
    tagName: 'tag2',
    description: 'Description',
    blocked: false,
  },
  {
    id: 1,
    name: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaprout',
    creationDate: new Date(),
    storyPoint: 2,
    assigneId: 2,
    tagName: 'taaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaag',
    description: '',
    blocked: false,
  },
  {
    id: 1,
    name: 'Todo',
    creationDate: new Date(),
    storyPoint: 2,
    assigneId: 2,
    description: '',
    blocked: false,
  },
  {
    id: 1,
    name: 'Todo',
    creationDate: new Date(),
    storyPoint: 2,
    assigneId: 2,
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

  const addTicket = (ticket: Omit<Ticket, 'id'>) => {
    const id = LocalStorage.addTicket(ticket);
    const newTicket = LocalStorage.getTicket(id);
    if (!newTicket) {
      return;
    }
    setTicketList((ticketList) => [...ticketList, newTicket]);
  };

  const deleteTicket = (id: number) => {
    LocalStorage.deleteTicket(id);
    setTicketList((ticketList) =>
      ticketList.filter((ticket) => ticket.id !== id)
    );
  };

  const updateTicket = (ticket: Ticket) => {
    LocalStorage.updadeTicket(ticket);
    setTicketList(ticketList.with(ticket.id, ticket));
  };

  const setDoneTicketToInProgress = (id: number) => {
    LocalStorage.setDoneToInProgress(id);
    const ticket = LocalStorage.getInProgressTicket(id);
    if (!ticket) {
      return;
    }
    setTicketList((ticketList) => ticketList.with(id, ticket));
  };

  const setDoneTicketToTodo = (id: number) => {
    LocalStorage.setDoneTicketToTodo(id);
    const ticket = LocalStorage.getTodoTicket(id);
    if (!ticket) {
      return;
    }
    setTicketList((ticketList) => ticketList.with(id, ticket));
  };

  const setInProgressTicketToDone = (id: number) => {
    LocalStorage.setInProgressToDone(id);
    const ticket = LocalStorage.getDoneTicket(id);
    if (!ticket) {
      return;
    }
    setTicketList((ticketList) => ticketList.with(id, ticket));
  };

  const setInProgressTicketToTodo = (id: number) => {
    LocalStorage.setInProgressToTodo(id);
    const ticket = LocalStorage.getTodoTicket(id);
    if (!ticket) {
      return;
    }
    setTicketList((ticketList) => ticketList.with(id, ticket));
  };

  const setTodoTicketToDone = (id: number) => {
    LocalStorage.setTodoToDone(id);
    const ticket = LocalStorage.getDoneTicket(id);
    if (!ticket) {
      return;
    }
    setTicketList((ticketList) => ticketList.with(id, ticket));
  };

  const setTodoTicketToInProgress = (id: number) => {
    LocalStorage.setTodoToInProgress(id);
    const ticket = LocalStorage.getInProgressTicket(id);
    if (!ticket) {
      return;
    }
    setTicketList((ticketList) => ticketList.with(id, ticket));
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
