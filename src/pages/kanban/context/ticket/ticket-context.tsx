import {
  Dispatch,
  FunctionComponent,
  ReactNode,
  createContext,
  useReducer,
} from 'react';
import { TodoTicket } from '../../../../shared/types/todo-ticket.type';
import { InProgressTicket } from '../../../../shared/types/in-progress-ticket.type';
import { DoneTicket } from '../../../../shared/types/done-ticket.type';
import { TicketAction } from './ticket-action';
import { ticketReducer } from './ticket-reducer';
import { LocalStorage } from '../../../../shared/utils/localStorage.utils';

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
    todoList: LocalStorage.getTodoTicketList(),
    inProgressList: LocalStorage.getInProgressTicketList(),
    doneList: LocalStorage.getDoneTicketList(),
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
