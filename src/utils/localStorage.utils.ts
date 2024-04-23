import { v4 as uuidv4 } from 'uuid';
import { DoneTicket } from '../types/done-ticket.type';
import { InProgressTicket } from '../types/in-progress-ticket.type';
import { Tag } from '../types/tag.type';
import { Ticket } from '../types/ticket.type';
import {
  isCreateDoneTicket,
  isCreateInProgressTicket,
  isCreateTodoTicket,
  isDoneTicket,
  isInProgressTicket,
  isTodoTicket,
} from './tickets-functions.utils';
import { TodoTicket } from '../types/todo-ticket.type';
import { User } from '../types/user.type';
import { CreateTicket } from '../types/create-ticket.type';
import { CreateUser } from '../types/create-user.type';
import { CreateTodoTicket } from '../types/create-todo-ticket.type';
import { CreateInProgressTicket } from '../types/create-in-progress-ticket.type';
import { CreateDoneTicket } from '../types/create-done-ticket.type';

export class LocalStorage {
  static readonly getUserList = (): User[] => {
    const userList = localStorage.getItem('userList');
    return userList ? JSON.parse(userList) : [];
  };

  static readonly setUserList = (userList: User[]) => {
    localStorage.setItem('userList', JSON.stringify(userList));
  };

  static readonly getUser = (userId: string): User | undefined => {
    const storedUsers = this.getUserList();
    const user = storedUsers.find((currUser) => currUser.id === userId);
    return user;
  };

  static readonly addUser = (userToAddInfos: CreateUser): string => {
    const storedUsers = this.getUserList();
    const uuid: string = uuidv4();
    const userToAdd: User = { ...userToAddInfos, id: uuid };
    storedUsers.push(userToAdd);
    this.setUserList(storedUsers);
    return userToAdd.id;
  };

  static readonly deleteUser = (userId: string) => {
    const todoTicketList = this.getTodoTicketList();
    const inProgressTicketList = this.getInProgressTicketList();
    const doneTicketList = this.getDoneTicketList();
    const storedUserList = this.getUserList();

    todoTicketList.forEach((currentTicket) => {
      if (currentTicket.assigneId === userId) {
        currentTicket.assigneId = undefined;
      }
    });
    this.setTodoTicketList(todoTicketList);

    inProgressTicketList.forEach((currentTicket) => {
      if (currentTicket.assigneId === userId) {
        currentTicket.assigneId = undefined;
      }
    });
    this.setInProgressTicketList(inProgressTicketList);

    doneTicketList.forEach((currentTicket) => {
      if (currentTicket.assigneId === userId) {
        currentTicket.assigneId = undefined;
      }
    });
    this.setDoneTicketList(doneTicketList);

    const filteredUserList = storedUserList.filter(
      (currUser) => currUser.id !== userId
    );
    this.setUserList(filteredUserList);
  };

  static readonly updateUser = (user: User) => {
    const userList = this.getUserList();
    const index = userList.findIndex((currUser) => currUser.id === user.id);
    this.setUserList(userList.with(index, user));
  };

  static readonly getTagList = (): Tag[] => {
    const tagList = localStorage.getItem('tagList');
    return tagList ? JSON.parse(tagList) : [];
  };

  static readonly setTagList = (tagList: Tag[]) => {
    localStorage.setItem('tagList', JSON.stringify(tagList));
  };

  static readonly getTag = (tagName: string): Tag | undefined => {
    const storedTags = this.getTagList();
    const tag = storedTags.find((currTag) => currTag.name === tagName);
    return tag;
  };

  static readonly addTag = (tagToAdd: Tag): string | undefined => {
    const tagList = this.getTagList();
    if (tagList.some((tag) => tag.name === tagToAdd.name)) {
      return;
    }
    tagList.push(tagToAdd);
    this.setTagList(tagList);
    return tagToAdd.name;
  };

  static readonly deleteTag = (tagName: string) => {
    const todoTicketList = this.getTodoTicketList();
    const inProgressTicketList = this.getInProgressTicketList();
    const doneTicketList = this.getDoneTicketList();
    const storedUserList = this.getTagList();

    todoTicketList.forEach((currentTicket) => {
      if (currentTicket.tagName === tagName) {
        currentTicket.tagName = undefined;
      }
    });
    this.setTodoTicketList(todoTicketList);

    inProgressTicketList.forEach((currentTicket) => {
      if (currentTicket.tagName === tagName) {
        currentTicket.tagName = undefined;
      }
    });
    this.setInProgressTicketList(inProgressTicketList);

    doneTicketList.forEach((currentTicket) => {
      if (currentTicket.tagName === tagName) {
        currentTicket.tagName = undefined;
      }
    });
    this.setDoneTicketList(doneTicketList);

    const filteredTagList = storedUserList.filter(
      (currTag: Tag) => currTag.name !== tagName
    );
    this.setTagList(filteredTagList);
  };

  static readonly updateTag = (tagName: string, newTag: Tag) => {
    const tagList = this.getTagList();
    const todoTicketList = this.getTodoTicketList();
    const inProgressTicketList = this.getInProgressTicketList();
    const doneTicketList = this.getDoneTicketList();

    todoTicketList.forEach((currentTicket) => {
      if (currentTicket.tagName === tagName) {
        currentTicket.tagName = newTag.name;
      }
    });
    this.setTodoTicketList(todoTicketList);

    inProgressTicketList.forEach((currentTicket) => {
      if (currentTicket.tagName === tagName) {
        currentTicket.tagName = newTag.name;
      }
    });
    this.setInProgressTicketList(inProgressTicketList);

    doneTicketList.forEach((currentTicket) => {
      if (currentTicket.tagName === tagName) {
        currentTicket.tagName = newTag.name;
      }
    });
    this.setDoneTicketList(doneTicketList);

    const tagIndex = tagList.findIndex((currTag) => currTag.name === tagName);
    this.setTagList(tagList.with(tagIndex, newTag));
  };

  static readonly getTodoTicketList = (): TodoTicket[] => {
    const storedTicketList = localStorage.getItem('todoTicketList');
    if (!storedTicketList) {
      return [];
    }
    const parsedTicketList: TodoTicket[] = JSON.parse(storedTicketList);
    return parsedTicketList
      .map((todoTicket) => {
        todoTicket.creationDate = new Date(todoTicket.creationDate);
        return todoTicket;
      })
      .sort((ticket1, ticket2) => ticket1.yIndex - ticket2.yIndex);
  };

  static readonly getInProgressTicketList = (): InProgressTicket[] => {
    const storedTicketList = localStorage.getItem('inProgressTicketList');
    if (!storedTicketList) {
      return [];
    }
    const parsedTicketList: InProgressTicket[] = JSON.parse(storedTicketList);
    return parsedTicketList
      .map((inProgressTicket) => {
        inProgressTicket.creationDate = new Date(inProgressTicket.creationDate);
        inProgressTicket.startDate = new Date(inProgressTicket.startDate);
        return inProgressTicket;
      })
      .sort((ticket1, ticket2) => ticket1.yIndex - ticket2.yIndex);
  };

  static readonly getDoneTicketList = (): DoneTicket[] => {
    const storedTicketList = localStorage.getItem('doneTicketList');
    if (!storedTicketList) {
      return [];
    }
    const parsedTicketList: DoneTicket[] = JSON.parse(storedTicketList);
    return parsedTicketList
      .map((doneTicket) => {
        doneTicket.creationDate = new Date(doneTicket.creationDate);
        doneTicket.startDate = new Date(doneTicket.startDate);
        doneTicket.endDate = new Date(doneTicket.endDate);
        return doneTicket;
      })
      .sort((ticket1, ticket2) => ticket1.yIndex - ticket2.yIndex);
  };

  static readonly setTodoTicketList = (todoTicketList: TodoTicket[]) => {
    localStorage.setItem('todoTicketList', JSON.stringify(todoTicketList));
  };

  static readonly setInProgressTicketList = (
    inProgressTicketList: InProgressTicket[]
  ) => {
    localStorage.setItem(
      'inProgressTicketList',
      JSON.stringify(inProgressTicketList)
    );
  };

  static readonly setDoneTicketList = (doneTicketList: DoneTicket[]) => {
    localStorage.setItem('doneTicketList', JSON.stringify(doneTicketList));
  };

  static readonly addTicket = (ticketToAdd: CreateTicket): string => {
    let newTicketId: string = '';
    if (isCreateTodoTicket(ticketToAdd)) {
      newTicketId = this.addTodoTicket(ticketToAdd);
    }
    if (isCreateInProgressTicket(ticketToAdd)) {
      newTicketId = this.addInProgressTicket(ticketToAdd);
    }
    if (isCreateDoneTicket(ticketToAdd)) {
      newTicketId = this.addDoneTicket(ticketToAdd);
    }

    if (ticketToAdd.childId) {
      this.updateChildRelation(newTicketId, ticketToAdd.childId);
    }
    if (ticketToAdd.parentId) {
      this.updateParentRelation(newTicketId, ticketToAdd.parentId);
    }
    return newTicketId;
  };

  static readonly addTodoTicket = (ticketToAdd: CreateTodoTicket): string => {
    const uuid: string = uuidv4();
    const todoTicketList = this.getTodoTicketList();
    const newTicket: TodoTicket = {
      ...ticketToAdd,
      id: uuid,
      yIndex: todoTicketList.length,
    };
    todoTicketList.push(newTicket);
    this.setTodoTicketList(todoTicketList);
    return uuid;
  };

  static readonly addInProgressTicket = (
    ticketToAdd: CreateInProgressTicket
  ): string => {
    const uuid: string = uuidv4();
    const inProgressTicketList = this.getInProgressTicketList();
    const newTicket: InProgressTicket = {
      ...ticketToAdd,
      id: uuid,
      yIndex: inProgressTicketList.length,
    };
    inProgressTicketList.push(newTicket);
    this.setInProgressTicketList(inProgressTicketList);
    return uuid;
  };

  static readonly addDoneTicket = (ticketToAdd: CreateDoneTicket): string => {
    const uuid: string = uuidv4();
    const doneTicketList = this.getDoneTicketList();
    const newTicket: DoneTicket = {
      ...ticketToAdd,
      id: uuid,
      yIndex: doneTicketList.length,
    };
    doneTicketList.push(newTicket);
    this.setDoneTicketList(doneTicketList);
    return uuid;
  };

  static readonly deleteTicket = (ticketId: string) => {
    const ticket = this.getTicket(ticketId);
    if (!ticket) {
      return;
    }

    this.clearParentsRelation(ticket);
    this.clearChildsRelation(ticket);
    if (isTodoTicket(ticket)) {
      this.deleteTodoTicket(ticketId);
    }
    if (isInProgressTicket(ticket)) {
      this.deleteInProgressTicket(ticketId);
    }
    if (isDoneTicket(ticket)) {
      this.deleteDoneTicket(ticketId);
    }
  };

  private static clearParentsRelation = (ticket: Ticket) => {
    if (!ticket.parentId) {
      return;
    }
    const previousParent = this.getTicket(ticket.parentId);
    if (!previousParent) {
      return;
    }
    previousParent.childId = undefined;
    this.updateTicket(previousParent);
  };

  private static clearChildsRelation = (ticket: Ticket) => {
    if (!ticket.childId) {
      return;
    }
    const previousChild = this.getTicket(ticket.childId);
    if (!previousChild) {
      return;
    }
    previousChild.parentId = undefined;
    this.updateTicket(previousChild);
  };

  private static updateParentRelation = (
    ticketId: string,
    parentId: string
  ) => {
    const ticket = this.getTicket(ticketId);
    const parentTicket = this.getTicket(parentId);
    if (!ticket || !parentTicket) {
      return;
    }
    this.clearChildsRelation(parentTicket);
    this.clearParentsRelation(ticket);
    ticket.parentId = parentId;
    parentTicket.childId = ticket.id;
    this.updateTicket(parentTicket);
    this.updateTicket(ticket);
  };

  private static updateChildRelation = (ticketId: string, childId: string) => {
    const ticket = this.getTicket(ticketId);
    const childTicket = this.getTicket(childId);
    if (!ticket || !childTicket) {
      return;
    }
    this.clearParentsRelation(childTicket);
    this.clearChildsRelation(ticket);
    ticket.childId = childTicket.id;
    childTicket.parentId = ticket.id;
    this.updateTicket(childTicket);
    this.updateTicket(ticket);
  };

  static readonly deleteTodoTicket = (ticketId: string) => {
    const ticketList = this.getTodoTicketList();
    const ticket = this.getTodoTicket(ticketId);
    if (!ticket) {
      return;
    }
    this.setTodoTicketList(
      ticketList
        .map((currentTicket: TodoTicket) => {
          if (currentTicket.yIndex > ticket.yIndex) {
            currentTicket.yIndex++;
          }
          return currentTicket;
        })
        .filter((currentTicket: TodoTicket) => currentTicket.id !== ticketId)
    );
  };

  static readonly deleteInProgressTicket = (ticketId: string) => {
    const ticketList = this.getInProgressTicketList();
    const ticket = this.getInProgressTicket(ticketId);
    if (!ticket) {
      return;
    }
    this.setInProgressTicketList(
      ticketList
        .map((currentTicket: InProgressTicket) => {
          if (currentTicket.yIndex > ticket.yIndex) {
            currentTicket.yIndex++;
          }
          return currentTicket;
        })
        .filter(
          (currentTicket: InProgressTicket) => currentTicket.id !== ticketId
        )
    );
  };

  static readonly deleteDoneTicket = (ticketId: string) => {
    const ticketList = this.getDoneTicketList();
    const ticket = this.getDoneTicket(ticketId);
    if (!ticket) {
      return;
    }
    this.setDoneTicketList(
      ticketList
        .map((currentTicket: DoneTicket) => {
          if (currentTicket.yIndex > ticket.yIndex) {
            currentTicket.yIndex++;
          }
          return currentTicket;
        })
        .filter((currentTicket: DoneTicket) => currentTicket.id !== ticketId)
    );
  };

  static readonly updateTicketsRelations = (ticket: Ticket) => {
    const ticketFromStorage = this.getTicket(ticket.id);
    if (!ticketFromStorage) {
      return;
    }

    if (ticket.childId) {
      this.updateChildRelation(ticket.id, ticket.childId);
    } else {
      this.clearChildsRelation(ticketFromStorage);
    }

    if (ticket.parentId) {
      this.updateParentRelation(ticket.id, ticket.parentId);
    } else {
      this.clearParentsRelation(ticketFromStorage);
    }
  };

  static readonly updateTicket = (ticket: Ticket) => {
    if (isTodoTicket(ticket)) {
      this.updateTodoTicket(ticket);
    }

    if (isInProgressTicket(ticket)) {
      this.updateInProgessTicket(ticket);
    }

    if (isDoneTicket(ticket)) {
      this.updateDoneTicket(ticket);
    }
  };

  static readonly updateTodoTicket = (ticket: TodoTicket) => {
    const todoTicketList = this.getTodoTicketList();
    const index = todoTicketList.findIndex(
      (currentTicket) => currentTicket.id === ticket.id
    );
    this.setTodoTicketList(todoTicketList.with(index, ticket));
  };

  static readonly updateInProgessTicket = (ticket: InProgressTicket) => {
    const inProgressTicketList = this.getInProgressTicketList();
    const index = inProgressTicketList.findIndex(
      (currentTicket) => currentTicket.id === ticket.id
    );
    this.setInProgressTicketList(inProgressTicketList.with(index, ticket));
  };

  static readonly updateDoneTicket = (ticket: DoneTicket) => {
    const doneTicketList = this.getDoneTicketList();
    const index = doneTicketList.findIndex(
      (currentTicket) => currentTicket.id === ticket.id
    );
    this.setDoneTicketList(doneTicketList.with(index, ticket));
  };

  static readonly getTicket = (ticketId: string): Ticket | undefined => {
    const storedTicketList = this.getTodoTicketList().concat(
      this.getInProgressTicketList(),
      this.getDoneTicketList()
    );
    return storedTicketList.find(
      (currentTicket) => currentTicket.id === ticketId
    );
  };

  static readonly getTodoTicket = (
    ticketId: string
  ): TodoTicket | undefined => {
    const storedTicketList = this.getTodoTicketList();
    return storedTicketList.find(
      (currentTicket) => currentTicket.id === ticketId
    );
  };

  static readonly getInProgressTicket = (
    ticketId: string
  ): InProgressTicket | undefined => {
    const storedTicketList = this.getInProgressTicketList();
    return storedTicketList.find(
      (currentTicket) => currentTicket.id === ticketId
    );
  };

  static readonly getDoneTicket = (
    ticketId: string
  ): DoneTicket | undefined => {
    const storedTicketList = this.getDoneTicketList();
    return storedTicketList.find(
      (currentTicket) => currentTicket.id === ticketId
    );
  };

  static readonly changeTodoTicketPosition = (
    sourceIndex: number,
    destinationIndex: number
  ) => {
    const todoTicketList = this.getTodoTicketList();
    todoTicketList.sort((ticket1, ticket2) => ticket1.yIndex - ticket2.yIndex);
    const movedTicket = todoTicketList.splice(sourceIndex, 1)[0];
    const updatedTicketList = todoTicketList.toSpliced(
      destinationIndex,
      0,
      movedTicket
    );
    updatedTicketList.forEach(
      (currentTiket, index) => (currentTiket.yIndex = index)
    );
    this.setTodoTicketList(updatedTicketList);
  };

  static readonly changeInProgressTicketPosition = (
    sourceIndex: number,
    destinationIndex: number
  ) => {
    const inProgressTicketList = this.getInProgressTicketList();
    inProgressTicketList.sort(
      (ticket1, ticket2) => ticket1.yIndex - ticket2.yIndex
    );
    const movedTicket = inProgressTicketList.splice(sourceIndex, 1)[0];
    const updatedTicketList = inProgressTicketList.toSpliced(
      destinationIndex,
      0,
      movedTicket
    );
    updatedTicketList.forEach(
      (currentTiket, index) => (currentTiket.yIndex = index)
    );
    this.setInProgressTicketList(updatedTicketList);
  };

  static readonly changeDoneTicketPosition = (
    sourceIndex: number,
    destinationIndex: number
  ) => {
    const doneTicketList = this.getDoneTicketList();
    doneTicketList.sort((ticket1, ticket2) => ticket1.yIndex - ticket2.yIndex);
    const movedTicket = doneTicketList.splice(sourceIndex, 1)[0];
    const updatedTicketList = doneTicketList.toSpliced(
      destinationIndex,
      0,
      movedTicket
    );
    updatedTicketList.forEach(
      (currentTiket, index) => (currentTiket.yIndex = index)
    );
    this.setDoneTicketList(updatedTicketList);
  };

  static readonly setTodoToInProgress = (
    ticketId: string,
    destinationIndex: number
  ) => {
    const ticket = this.getTodoTicket(ticketId);

    if (ticket === undefined || ticket.blocked) {
      return;
    }

    const inProgress = {
      ...ticket,
      blocked: ticket.blocked,
      startDate: new Date(),
    };
    inProgress.yIndex = destinationIndex;

    const todoTicketList = this.getTodoTicketList();
    this.setTodoTicketList(
      todoTicketList.filter((currentTicket) => currentTicket.id !== ticketId)
    );

    let inProgressTicketList = this.getInProgressTicketList();
    inProgressTicketList = inProgressTicketList.map((currentTicket) => {
      if (currentTicket.yIndex >= destinationIndex) {
        currentTicket.yIndex++;
      }
      return currentTicket;
    });
    this.setInProgressTicketList(
      inProgressTicketList.toSpliced(destinationIndex, 0, inProgress)
    );
  };

  static readonly setInProgressToTodo = (
    ticketId: string,
    destinationIndex: number
  ) => {
    const inProgress = this.getInProgressTicket(ticketId);
    if (inProgress === undefined || !isInProgressTicket(inProgress)) {
      return;
    }
    const { startDate, ...todo } = inProgress;
    todo.yIndex = destinationIndex;

    const inProgressTicketList = this.getInProgressTicketList();
    this.setInProgressTicketList(
      inProgressTicketList.filter(
        (currentTicket) => currentTicket.id !== ticketId
      )
    );

    let todoTicketList = this.getTodoTicketList();
    todoTicketList = todoTicketList.map((currentTicket) => {
      if (currentTicket.yIndex >= destinationIndex) {
        currentTicket.yIndex++;
      }
      return currentTicket;
    });
    this.setTodoTicketList(todoTicketList.toSpliced(destinationIndex, 0, todo));
  };

  static readonly setInProgressToDone = (
    ticketId: string,
    destinationIndex: number
  ) => {
    const inProgress = this.getInProgressTicket(ticketId);
    if (inProgress === undefined || !isInProgressTicket(inProgress)) {
      return;
    }
    const done = {
      ...inProgress,
      startDate: inProgress.startDate,
      endDate: new Date(),
    };
    done.yIndex = destinationIndex;

    const inProgressTicketList = this.getInProgressTicketList();
    this.setInProgressTicketList(
      inProgressTicketList.filter(
        (currentTicket) => currentTicket.id !== ticketId
      )
    );

    let doneTicketList = this.getDoneTicketList();
    doneTicketList = doneTicketList.map((currentTicket) => {
      if (currentTicket.yIndex >= destinationIndex) {
        currentTicket.yIndex++;
      }
      return currentTicket;
    });
    this.setDoneTicketList(doneTicketList.toSpliced(destinationIndex, 0, done));
  };

  static readonly setDoneToInProgress = (
    ticketId: string,
    destinationIndex: number
  ) => {
    const done = this.getDoneTicket(ticketId);
    if (done === undefined || !isDoneTicket(done)) {
      return;
    }
    const { endDate, ...inProgress } = done;
    inProgress.yIndex = destinationIndex;

    const doneTicketList = this.getDoneTicketList();
    this.setDoneTicketList(
      doneTicketList.filter((currentTicket) => currentTicket.id !== ticketId)
    );

    let inProgressTicketList = this.getInProgressTicketList();
    inProgressTicketList = inProgressTicketList.map((currentTicket) => {
      if (currentTicket.yIndex >= destinationIndex) {
        currentTicket.yIndex++;
      }
      return currentTicket;
    });
    this.setInProgressTicketList(
      inProgressTicketList.toSpliced(destinationIndex, 0, inProgress)
    );
  };

  static readonly setTodoToDone = (
    ticketId: string,
    destinationIndex: number
  ) => {
    const ticket = this.getTodoTicket(ticketId);
    if (ticket === undefined || ticket.blocked) {
      return;
    }
    const done = {
      ...ticket,
      blocked: ticket.blocked,
      startDate: new Date(),
      endDate: new Date(),
    };
    done.yIndex = destinationIndex;

    const todoTicketList = this.getTodoTicketList();
    this.setTodoTicketList(
      todoTicketList.filter((currentTicket) => currentTicket.id !== ticketId)
    );

    let doneTicketList = this.getDoneTicketList();
    doneTicketList = doneTicketList.map((currentTicket) => {
      if (currentTicket.yIndex >= destinationIndex) {
        currentTicket.yIndex++;
      }
      return currentTicket;
    });
    this.setDoneTicketList(doneTicketList.toSpliced(destinationIndex, 0, done));
  };

  static readonly setDoneTicketToTodo = (
    ticketId: string,
    destinationIndex: number
  ) => {
    const done = this.getDoneTicket(ticketId);
    if (done === undefined || !isDoneTicket(done)) {
      return;
    }
    const { endDate, startDate, ...todo } = done;
    todo.yIndex = destinationIndex;

    const doneTicketList = this.getDoneTicketList();
    this.setDoneTicketList(
      doneTicketList.filter((currentTicket) => currentTicket.id !== ticketId)
    );

    let todoTicketList = this.getTodoTicketList();
    todoTicketList = todoTicketList.map((currentTicket) => {
      if (currentTicket.yIndex >= destinationIndex) {
        currentTicket.yIndex++;
      }
      return currentTicket;
    });
    this.setTodoTicketList(todoTicketList.toSpliced(destinationIndex, 0, todo));
  };
}
