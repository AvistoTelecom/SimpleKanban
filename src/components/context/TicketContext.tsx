import {
  Dispatch,
  FunctionComponent,
  ReactNode,
  createContext,
  useReducer,
} from 'react';
import { TodoTicket } from '../../model/TodoTicket';
import { InProgressTicket } from '../../model/InProgressTicket';
import { DoneTicket } from '../../model/DoneTicket';
import { TicketAction } from './TicketAction';
import { ticketReducer } from './TicketReducer';

export type TicketContextType = {
  todoTicketList: TodoTicket[];
  inProgressTicketList: InProgressTicket[];
  doneTicketList: DoneTicket[];
  dispatchTicketList: Dispatch<TicketAction>;
};

export const TicketContext = createContext<TicketContextType>({
  todoTicketList: [],
  inProgressTicketList: [],
  doneTicketList: [],
  dispatchTicketList: () => {},
});

export const TicketContextProvider: FunctionComponent<{
  children: ReactNode;
}> = ({ children }) => {
  const [allTicketList, dispatchTicketList] = useReducer(ticketReducer, {
    todoList: [],
    inProgressList: [],
    doneList: [],
  });

  return (
    <TicketContext.Provider
      value={{
        todoTicketList: allTicketList.todoList,
        inProgressTicketList: allTicketList.inProgressList,
        doneTicketList: allTicketList.doneList,
        dispatchTicketList: dispatchTicketList,
      }}
    >
      {children}
    </TicketContext.Provider>
  );
};
