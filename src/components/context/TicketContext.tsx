import { FunctionComponent, ReactNode, createContext, useState } from 'react';
import { Ticket } from '../../model/Ticket';
import { LocalStorageUtil } from '../../localStorage';
import { CreateTicket } from '../../model/CreateTicket';

export type TicketContextType = {
  ticketList: Ticket[];
  addTicket: (ticket: CreateTicket) => void;
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
    assigneId: null,
    tagName: 'tag1',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas quis orci orci. Ut euismod felis risus, sed euismod tellus luctus ac. Suspendisse interdum lacinia tortor. Aliquam in nibh vulputate, mattis odio pretium, sollicitudin ligula. Fusce tempor imperdiet tempus. Sed euismod in mauris vel tempus. Maecenas rhoncus tortor vitae turpis varius, sed porttitor lorem viverra. Fusce ultricies vel lorem efficitur vestibulum.',
    parentId: null,
    childId: null,
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
    parentId: null,
    childId: null,
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
    parentId: null,
    childId: null,
    blocked: false,
  },
  {
    id: 1,
    name: 'Todo',
    creationDate: new Date(),
    storyPoint: 2,
    assigneId: 2,
    tagName: null,
    description: '',
    parentId: null,
    childId: null,
    blocked: false,
  },
  {
    id: 1,
    name: 'Todo',
    creationDate: new Date(),
    storyPoint: 2,
    assigneId: 2,
    tagName: null,
    description: '',
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
}> = ({ children }) => {
  const [ticketList, setTicketList] = useState<Ticket[]>(todoTicketListDefault);

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
