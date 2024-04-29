import {
  Dispatch,
  FunctionComponent,
  ReactNode,
  createContext,
  useReducer,
} from 'react';

import { TicketAction } from './ticket-action';
import { ticketReducer } from './ticket-reducer';
import { InProgressTicket } from '@model/ticket/in-progress-ticket.type';
import { TodoTicket } from '@model/ticket/todo-ticket.type';
import { DoneTicket } from '@model/ticket/done-ticket.type';
import { LocalStorage } from '@utils/localStorage.utils';

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
