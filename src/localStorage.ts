import { DoneTicket } from './model/DoneTicket';
import { InProgressTicket } from './model/InProgressTicket';
import { Tag } from './model/Tag';
import { Ticket } from './model/Ticket';
import { TodoTicket } from './model/TodoTicket';
import { User } from './model/User';

type ToDoTicketStorage = Ticket & {
  status: 'todo';
  startDate: null;
  endDate: null;
};

type InProgressTicketStorage = InProgressTicket & {
  status: 'inProgress';
  endDate: null;
};

type DoneTicketStorage = DoneTicket & {
  status: 'done';
};

type TicketStorage =
  | ToDoTicketStorage
  | InProgressTicketStorage
  | DoneTicketStorage;

export class LocalStorageUtil {
  static getUserList = (): User[] => {
    const userList = localStorage.getItem('userList');
    return userList ? JSON.parse(userList) : [];
  };

  static setUserList = (userList: User[]) => {
    window.localStorage.setItem('userList', JSON.stringify(userList));
  };

  static getUser = (userId: number): User | null => {
    const storedUsers = this.getUserList();
    const user = storedUsers.find((currUser) => currUser.id === userId);
    return user ?? null;
  };

  static addUser = (userToAddInfos: Omit<User, 'id'>): number => {
    const storedUsers = this.getUserList();
    let maxUserId = 0;
    if (storedUsers.length !== 0) {
      maxUserId = storedUsers.reduce((prevUser, currUser) =>
        prevUser && prevUser.id > currUser.id ? prevUser : currUser
      ).id;
    }
    const userToAdd = { ...userToAddInfos, id: maxUserId + 1 };
    storedUsers.push(userToAdd);
    this.setUserList(storedUsers);
    return userToAdd.id;
  };

  static deleteUser = (userId: number) => {
    const ticketList = this.getTicketList();
    const storedUser = this.getUserList();
    ticketList.forEach((currTicket) => {
      if (currTicket.assigneId === userId) {
        currTicket.assigneId = null;
      }
    });
    this.setTicketList(ticketList);
    const filteredUserList = storedUser.filter((currUser) => {
      currUser.id !== userId;
    });
    this.setUserList(filteredUserList);
  };

  static updateUser = (user: User) => {
    const userList = this.getUserList();
    const index = userList.findIndex((currUser) => {
      currUser.id === user.id;
    });
    this.setUserList(userList.with(index, user));
  };

  static getTagList = (): Tag[] => {
    const tagList = localStorage.getItem('tagList');
    return tagList ? JSON.parse(tagList) : [];
  };

  static setTagList = (tagList: Tag[]) => {
    window.localStorage.setItem('tagList', JSON.stringify(tagList));
  };

  static getTag = (tagName: string): Tag | null => {
    const storedTags = this.getTagList();
    const tag = storedTags.find((currTag) => currTag.name === tagName);
    return tag ?? null;
  };

  static addTag = (tagToAdd: Tag): string | null => {
    const tagList = this.getTagList();
    if (tagList.some((tag) => tag.name === tagToAdd.name)) {
      return null;
    }
    tagList.push(tagToAdd);
    this.setTagList(tagList);
    return tagToAdd.name;
  };

  static deleteTag = (tagName: string) => {
    const storedTickets = this.getTicketList();
    const storedUser = this.getTagList();
    storedTickets.forEach((currTicket) => {
      if (currTicket.tagName === tagName) {
        currTicket.tagName = null;
      }
    });
    this.setTicketList(storedTickets);
    const filteredTaList = storedUser.filter((currTag: Tag) => {
      currTag.name !== tagName;
    });
    this.setTagList(filteredTaList);
  };

  static updateTag = (oldTag: Tag, newTag: Tag) => {
    const tagList = this.getTagList();
    const ticketList = this.getTicketList();
    ticketList.forEach((currTicket) => {
      if (currTicket.tagName === oldTag.name) {
        currTicket.tagName = newTag.name;
      }
    });
    this.setTicketList(ticketList);
    const tagIndex = tagList.findIndex((currTag) => {
      currTag.name === oldTag.name;
    });
    this.setTagList(tagList.with(tagIndex, newTag));
  };

  static getTicketList = (): Ticket[] => {
    const storedTickets = localStorage.getItem('ticketList');
    if (storedTickets === null) {
      return [];
    }
    const storedTicketList: TicketStorage[] = JSON.parse(storedTickets);
    const ticketList = storedTicketList.map((currTicket) => {
      const { status, startDate, endDate, ...ticket } = currTicket;
      if (status === 'todo') {
        return { ...ticket, blocked: currTicket.blocked };
      }
      const inProgress: InProgressTicket = {
        ...ticket,
        startDate: startDate,
        blocked: currTicket.blocked,
      };
      if (status === 'inProgress') {
        return inProgress;
      }
      const done: DoneTicket = {
        ...inProgress,
        endDate: endDate,
      };
      return done;
    });
    return ticketList;
  };

  static getTodoTicketList = (): TodoTicket[] => {
    const ticketList = this.getTicketList();
    return ticketList.filter((currTicket) => {
      !('starDate' in currTicket);
    });
  };

  static getInProgressTicketList = (): InProgressTicket[] => {
    const ticketList = this.getTicketList();
    return ticketList.filter(
      (currTicket) => 'starDate' in currTicket && !('endDate' in currTicket)
    ) as InProgressTicket[];
  };

  static getDoneTicketList = (): DoneTicket[] => {
    const ticketList = this.getTicketList();
    return ticketList.filter(
      (currTicket) => 'endDate' in currTicket
    ) as DoneTicket[];
  };

  static setTicketList = (ticketList: Ticket[]) => {
    const result = ticketList.map((currTicket) => {
      if ('endDate' in currTicket) {
        return { ...currTicket, status: 'done' };
      }
      if ('startDate' in currTicket) {
        return { ...currTicket, status: 'inProgress', endDate: null };
      }
      return { ...currTicket, status: 'todo', startDate: null, endDate: null };
    });
    window.localStorage.setItem('ticketList', JSON.stringify(result));
  };

  static getTicket = (ticketId: number): Ticket | null => {
    const storedTickets = this.getTicketList();
    const ticket = storedTickets.find(
      (currTicket) => currTicket.id === ticketId
    );
    return ticket ?? null;
  };

  static addTicket = (ticketToAddInfos: Omit<Ticket, 'id'>): number => {
    const storedTickets = this.getTicketList();
    let maxTicketId: number = 0;
    if (storedTickets.length !== 0) {
      maxTicketId = storedTickets.reduce((prevTicket, currTicket) =>
        prevTicket && prevTicket.id > currTicket.id ? prevTicket : currTicket
      ).id;
    }
    const ticketToAdd = { ...ticketToAddInfos, id: maxTicketId + 1 };
    storedTickets.push(ticketToAdd);
    this.setTicketList(storedTickets);
    return ticketToAdd.id;
  };

  static deleteTicket = (ticketId: number) => {
    const ticketList = this.getTicketList();
    ticketList.forEach((currTicket) => {
      if (currTicket.childId === ticketId) {
        currTicket.childId = null;
      }
      if (currTicket.parentId === ticketId) {
        currTicket.parentId = null;
      }
    });
    const filteredTicketList = ticketList.filter((currTicket) => {
      currTicket.id !== ticketId;
    });
    this.setTicketList(filteredTicketList);
  };

  static updadeTicket = (ticket: Ticket) => {
    const ticketList = this.getTicketList();
    const index = ticketList.findIndex((currTicket) => {
      currTicket.id === ticket.id;
    });
    this.setTicketList(ticketList.with(index, ticket));
  };

  static getInProgressTicket = (
    inProgressTicketId: number
  ): InProgressTicket | null => {
    const storedInProgressTickets = this.getInProgressTicketList();
    const inProgressTicket = storedInProgressTickets.find(
      (currInProgressTicket) => currInProgressTicket.id === inProgressTicketId
    );
    return inProgressTicket ?? null;
  };

  static getDoneTicket = (doneTicketId: number): DoneTicket | null => {
    const storedDoneTickets = this.getDoneTicketList();
    const doneTicket = storedDoneTickets.find(
      (currDoneTicket) => currDoneTicket.id === doneTicketId
    );
    return doneTicket ?? null;
  };

  static setTodoToInProgress = (
    ticketToSet: TodoTicket
  ): InProgressTicket | null => {
    const ticket = this.getTicket(ticketToSet.id);
    if (ticket === null || ticket.blocked) {
      return null;
    }
    const inProgress = {
      ...ticket,
      blocked: ticket.blocked,
      startDate: new Date(),
    };
    this.updadeTicket(inProgress);
    return inProgress;
  };

  static setInProgressToTodo = (ticketToSet: TodoTicket): Ticket | null => {
    const inProgress = this.getTicket(ticketToSet.id);
    if (inProgress === null || !('startDate' in inProgress)) {
      return null;
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { startDate, ...todo } = inProgress;
    this.updadeTicket(todo);
    return todo;
  };

  static setInProgressToDone = (
    ticketToSet: InProgressTicket
  ): DoneTicket | null => {
    const inProgress = this.getTicket(ticketToSet.id);
    if (inProgress === null || !('startDate' in inProgress)) {
      return null;
    }
    const done = {
      ...inProgress,
      startDate: inProgress.startDate,
      endDate: new Date(),
    };
    this.updadeTicket(done);
    return done;
  };

  static setDoneToInProgress = (
    ticketToSet: DoneTicket
  ): InProgressTicket | null => {
    const done = this.getTicket(ticketToSet.id);
    if (done === null || !('endDate' in done)) {
      return null;
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { endDate, ...inProgress } = done;
    this.updadeTicket(inProgress);
    return inProgress;
  };

  static setTodoToDone = (ticket: Ticket): DoneTicket | null => {
    const inProgress = this.setTodoToInProgress(ticket);
    return inProgress === null ? null : this.setInProgressToDone(inProgress);
  };

  static setDoneTicketToTodo = (doneTicket: DoneTicket) => {
    const inProgress = this.setDoneToInProgress(doneTicket);
    return inProgress === null ? null : this.setInProgressToTodo(inProgress);
  };
}
