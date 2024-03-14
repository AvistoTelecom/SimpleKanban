import { DoneTicket } from './model/DoneTicket';
import { InProgressTicket } from './model/InProgressTicket';
import { Tag } from './model/Tag';
import { Ticket } from './model/Ticket';
import { User } from './model/User';

interface InProgressTicketStorage {
  ticketId: number;
  startDate: Date;
}

interface DoneTicketStorage {
  inProgressTicketId: number;
  endDate: Date;
}

export class LocalStorageUtil {
  static getItem<T>(key: string): T[] {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : [];
  }

  static setItem<T>(key: string, value: T): void {
    window.localStorage.setItem(key, JSON.stringify(value));
  }

  // Users
  static getUserList = (): User[] => {
    return this.getItem('users');
  };

  static getUser = (userId: number): User | null => {
    const storedUsers: User[] = this.getUserList();
    const user: User | undefined = storedUsers.find(
      (currUser: User) => currUser.id === userId
    );
    return user === undefined ? null : user;
  };

  static addUser = (userToAddInfos: Omit<User, 'id'>): number => {
    const storedUsers: User[] = this.getUserList();
    let maxUserId: number = 0;
    if (storedUsers.length !== 0) {
      maxUserId = storedUsers.reduce((prevUser, currUser) =>
        prevUser && prevUser.id > currUser.id ? prevUser : currUser
      ).id;
    }
    const userToAdd = userToAddInfos as User;
    userToAdd.id = maxUserId + 1;
    storedUsers.push(userToAdd);
    this.setItem('users', storedUsers);
    return userToAdd.id;
  };

  static deleteUser = (userId: number) => {
    const storedTickets = this.getTicketList();
    const storedUser = this.getUserList();
    // Unasign tickets
    this.setItem(
      'tickets',
      storedTickets.map((currTicket: Ticket) => {
        if (currTicket.assigneId === userId) {
          currTicket.assigneId = null;
        }
      })
    );
    this.setItem(
      'users',
      storedUser.filter((currUser: User) => {
        currUser.id !== userId;
      })
    );
  };

  static updateUser = (user: User) => {
    const storedUser = this.getUserList();
    this.setItem(
      'users',
      storedUser.map((currUser: User) => {
        if (currUser.id === user.id) {
          return user;
        }
        return currUser;
      })
    );
  };

  // Tags
  static getTagList = (): Tag[] => {
    return this.getItem('tags');
  };

  static getTag = (tagName: string): Tag | null => {
    const storedTags: Tag[] = this.getTagList();
    const tag: Tag | undefined = storedTags.find(
      (currTag: Tag) => currTag.name === tagName
    );
    return tag === undefined ? null : tag;
  };

  static addTag = (tagToAdd: Tag): string | null => {
    const storedTags: Tag[] = this.getTagList();
    if (storedTags.some((tag) => tag.name === tagToAdd.name)) {
      return null;
    }
    storedTags.push(tagToAdd);
    this.setItem('tags', storedTags);
    return tagToAdd.name;
  };

  static deleteTag = (tagName: string) => {
    const storedTickets = this.getTicketList();
    const storedUser = this.getTagList();
    // remove this tag from tickets
    this.setItem(
      'tickets',
      storedTickets.map((currTicket: Ticket) => {
        if (currTicket.tagName === tagName) {
          currTicket.tagName = null;
        }
        return currTicket;
      })
    );
    this.setItem(
      'tags',
      storedUser.filter((currTag: Tag) => {
        currTag.name !== tagName;
      })
    );
  };

  static updateTag = (oldTag: Tag, newTag: Tag) => {
    const storedUser = this.getTagList();
    const storedTicket = this.getTicketList();
    // update this tag in tickets
    this.setItem(
      'tickets',
      storedTicket.map((currTicket: Ticket) => {
        if (currTicket.tagName === oldTag.name) {
          currTicket.tagName = newTag.name;
        }
        return currTicket;
      })
    );
    this.setItem(
      'tags',
      storedUser.map((currTag: Tag) => {
        if (currTag.name === oldTag.name) {
          return newTag;
        }
        return currTag;
      })
    );
  };

  // Ticket
  static getTicketList = (): Ticket[] => {
    const storedTickets: Ticket[] = this.getItem('tickets');
    const storedInProgressTickets: InProgressTicketStorage[] =
      this.getItem('inProgressTickets');
    const doneTickets: DoneTicketStorage[] = this.getItem('doneTickets');
    // add dates infos if tickets are inProgress or done
    return storedTickets.map((currTicket: Ticket) => {
      const inProgress: InProgressTicketStorage | undefined =
        storedInProgressTickets.find(
          (currInProgress: InProgressTicketStorage) =>
            currInProgress.ticketId === currTicket.id
        );
      const done = doneTickets.find(
        (currDone: DoneTicketStorage) =>
          currDone.inProgressTicketId === currTicket.id
      );
      if (done !== undefined && inProgress !== undefined) {
        const result = currTicket as DoneTicket;
        result.startDate = inProgress.startDate;
        result.endDate = done.endDate;
        return result;
      }
      if (inProgress !== undefined) {
        const result = currTicket as InProgressTicket;
        result.startDate = inProgress.startDate;
        return result;
      }
      return currTicket;
    });
  };

  static getTicket = (ticketId: number): Ticket | null => {
    const storedTickets: Ticket[] = this.getTicketList();
    const ticket: Ticket | undefined = storedTickets.find(
      (currTicket: Ticket) => currTicket.id === ticketId
    );
    return ticket === undefined ? null : ticket;
  };

  static addTicket = (ticketToAddInfos: Omit<Ticket, 'id'>): number => {
    const storedTickets: Ticket[] = this.getTicketList();
    let maxTicketId: number = 0;
    if (storedTickets.length !== 0) {
      maxTicketId = storedTickets.reduce((prevTicket, currTicket) =>
        prevTicket && prevTicket.id > currTicket.id ? prevTicket : currTicket
      ).id;
    }
    const ticketToAdd = ticketToAddInfos as Ticket;
    ticketToAdd.id = maxTicketId + 1;
    storedTickets.push(ticketToAdd);
    this.setItem('tickets', storedTickets);
    return ticketToAdd.id;
  };

  static deleteTicket = (ticketId: number) => {
    const storedTickets = this.getTicketList();
    const storedInProgress: InProgressTicketStorage[] =
      this.getItem('inProgressTickets');
    const storedDone: DoneTicketStorage[] = this.getItem('doneTickets');
    // remove from inProgress and done if present
    this.setItem(
      'inProgressTickets',
      storedInProgress.filter((currInProgress) => {
        currInProgress.ticketId !== ticketId;
      })
    );
    this.setItem(
      'doneTicket',
      storedDone.filter((currDone) => {
        currDone.inProgressTicketId !== ticketId;
      })
    );
    // remove from other tickets
    const result = storedTickets.map((currTicket: Ticket) => {
      if (currTicket.childId === ticketId) {
        currTicket.childId = null;
      }
      if (currTicket.parentId === ticketId) {
        currTicket.parentId = null;
      }
      return currTicket;
    });
    this.setItem(
      'tickets',
      result.filter((currTicket: Ticket) => {
        currTicket.id !== ticketId;
      })
    );
  };

  static updadeTicket = (ticket: Ticket) => {
    const storedTickets = this.getTicketList();
    this.setItem(
      'tickets',
      storedTickets.map((currTicket: Ticket) => {
        if (currTicket.id === ticket.id) {
          return ticket;
        }
        return currTicket;
      })
    );
  };

  // InProgressTicket
  static getInProgressTicketList = (): InProgressTicket[] => {
    const storedInProgressTickets: InProgressTicketStorage[] =
      this.getItem('inProgressTickets');
    return storedInProgressTickets.map(
      (currInProgressTicket: InProgressTicketStorage) => {
        const inProgressTicket = this.getTicket(
          currInProgressTicket.ticketId
        ) as InProgressTicket;
        inProgressTicket.startDate = currInProgressTicket.startDate;
        return inProgressTicket;
      }
    );
  };

  static getInProgressTicket = (
    inProgressTicketId: number
  ): InProgressTicket | null => {
    const storedInProgressTickets: InProgressTicket[] =
      this.getInProgressTicketList();
    const inProgressTicket: InProgressTicket | undefined =
      storedInProgressTickets.find(
        (currInProgressTicket: InProgressTicket) =>
          currInProgressTicket.id === inProgressTicketId
      );
    return inProgressTicket === undefined ? null : inProgressTicket;
  };

  // DoneTicket
  static getDoneTicketList = (): DoneTicket[] => {
    const storedDoneTickets: DoneTicketStorage[] = this.getItem('doneTickets');
    return storedDoneTickets.map((currDoneTicket: DoneTicketStorage) => {
      const doneTicket = this.getInProgressTicket(
        currDoneTicket.inProgressTicketId
      ) as DoneTicket;
      doneTicket.endDate = currDoneTicket.endDate;
      return doneTicket;
    });
  };

  static getDoneTicket = (doneTicketId: number): DoneTicket | null => {
    const storedDoneTickets: DoneTicket[] = this.getDoneTicketList();
    const doneTicket: DoneTicket | undefined = storedDoneTickets.find(
      (currDoneTicket: DoneTicket) => currDoneTicket.id === doneTicketId
    );
    return doneTicket === undefined ? null : doneTicket;
  };

  // Tickets Todo-InProgress-Done
  static setTodoToInProgress = (ticket: Ticket): InProgressTicket | null => {
    if (this.getTicket(ticket.id) === null) {
      return null;
    }
    const inProgressTicket = ticket as InProgressTicket;
    inProgressTicket.startDate = new Date();
    const storedInProgressTickets: InProgressTicketStorage[] =
      this.getItem('inProgressTickets');
    storedInProgressTickets.push({
      ticketId: inProgressTicket.id,
      startDate: inProgressTicket.startDate,
    });
    this.setItem('inProgressTickets', storedInProgressTickets);
    return inProgressTicket;
  };

  static setInProgressToTodo = (
    inProgress: InProgressTicket
  ): Ticket | null => {
    if (this.getInProgressTicket(inProgress.id) === null) {
      return null;
    }
    const inProgressTickets: InProgressTicketStorage[] =
      this.getItem('inProgressTickets');
    this.setItem(
      'inProgressTicket',
      inProgressTickets.filter((currInProgress: InProgressTicketStorage) => {
        currInProgress.ticketId !== inProgress.id;
      })
    );
    return inProgress as Ticket;
  };

  static setInProgressToDone = (
    inProgressTicket: InProgressTicket
  ): DoneTicket | null => {
    if (this.getInProgressTicket(inProgressTicket.id) === null) {
      return null;
    }
    const doneTicket = inProgressTicket as DoneTicket;
    doneTicket.endDate = new Date();
    const storedDoneTickets: DoneTicketStorage[] = this.getItem('doneTickets');
    storedDoneTickets.push({
      inProgressTicketId: doneTicket.id,
      endDate: doneTicket.endDate,
    });
    this.setItem('doneTickets', storedDoneTickets);
    return doneTicket;
  };

  static setDoneToInProgress = (
    doneTicket: DoneTicket
  ): InProgressTicket | null => {
    if (this.getDoneTicket(doneTicket.id) === null) {
      return null;
    }
    const doneTickets: DoneTicketStorage[] = this.getItem('doneTickets');
    this.setItem(
      'doneTickets',
      doneTickets.filter((currDone: DoneTicketStorage) => {
        currDone.inProgressTicketId !== doneTicket.id;
      })
    );
    return doneTicket as InProgressTicket;
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
