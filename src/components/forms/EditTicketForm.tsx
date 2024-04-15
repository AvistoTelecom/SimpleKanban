import { FunctionComponent } from 'react';
import { Ticket } from '../../model/Ticket';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
  isDoneTicket,
  isInProgressTicket,
  isTodoTicket,
} from '../../model/TicketsFunctions';
import { InProgressTicket } from '../../model/InProgressTicket';
import { DoneTicket } from '../../model/DoneTicket';
import { User } from '../../model/User';
import { Tag } from '../../model/Tag';

type EditTicketFormProps = {
  ticket: Ticket;
  userList: User[];
  tagList: Tag[];
  ticketList: Ticket[];
  onEditTicket: (ticket: Ticket) => void;
};

type FormInputs = {
  name: string;
  storyPoint: number;
  assigneId?: string;
  tagName?: string;
  description: string;
  parentId?: string;
  childId?: string;
  blocked: boolean;
};

export const EditTicketForm: FunctionComponent<EditTicketFormProps> = ({
  userList,
  tagList,
  ticketList,
  ticket,
  onEditTicket,
}) => {
  const { register, handleSubmit } = useForm<FormInputs>({
    defaultValues: {
      name: ticket.name,
      storyPoint: ticket.storyPoint,
      assigneId: ticket.assigneId,
      tagName: ticket.tagName,
      description: ticket.description,
      parentId: ticket.parentId,
      childId: ticket.childId,
      blocked: ticket.blocked,
    },
  });

  const onSubmit: SubmitHandler<FormInputs> = (formData) => {
    const newTicket: Ticket = {
      id: ticket.id,
      name: formData.name,
      storyPoint: formData.storyPoint,
      assigneId: formData.assigneId === '' ? undefined : formData.assigneId,
      tagName: formData.tagName === '' ? undefined : formData.tagName,
      description: formData.description,
      parentId: formData.parentId === '' ? undefined : formData.parentId,
      childId: formData.childId === '' ? undefined : formData.childId,
      creationDate: ticket.creationDate,
      blocked: formData.blocked,
      yIndex: ticket.yIndex,
    };

    if (isInProgressTicket(ticket)) {
      const inProgressTicket: InProgressTicket = {
        ...newTicket,
        startDate: ticket.startDate,
        blocked: false,
      };
      onEditTicket(inProgressTicket);
    }

    if (isDoneTicket(ticket)) {
      const doneTicket: DoneTicket = {
        ...newTicket,
        startDate: ticket.startDate,
        endDate: ticket.endDate,
        blocked: false,
      };
      onEditTicket(doneTicket);
      return;
    }

    onEditTicket(newTicket);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 w-full items-center p-4 overflow-y-auto max-h-full justify-between"
    >
      <label className="form-control w-full max-w-md">
        <div className="label">
          <span className="label-text">Name :</span>
        </div>
        <input
          type="text"
          placeholder="Title..."
          className="input input-bordered input-sm w-full"
          {...register('name')}
        />
      </label>
      <label className="form-control w-full max-w-md">
        <div className="label">
          <span className="label-text">Description :</span>
        </div>
        <textarea
          className="textarea textarea-bordered"
          placeholder="Description..."
          {...register('description')}
        />
      </label>

      <div className="grid grid-cols-2 max-w-md gap-x-12">
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Tag :</span>
          </div>
          <select
            className="select select-bordered w-full"
            {...register('tagName')}
          >
            <option value={''}>None</option>
            {tagList.map((tag, index) => (
              <option key={index} value={tag.name}>
                {tag.name}
              </option>
            ))}
          </select>
        </label>

        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Story Points :</span>
          </div>
          <input
            type="number"
            placeholder="Story points..."
            min={0}
            className="input input-bordered input-md w-full"
            {...register('storyPoint')}
          />
        </label>

        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Assignee :</span>
          </div>
          <select
            className="select select-bordered w-full"
            {...register('assigneId')}
          >
            <option value={''}>None</option>
            {userList.map((user, index) => (
              <option key={index} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </label>

        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Parent ticket :</span>
          </div>
          <select
            className="select select-bordered w-full"
            {...register('parentId')}
          >
            <option value={''}>None</option>
            {ticketList.map((currentTicket, index) => {
              if (ticket.id === currentTicket.id) {
                return null;
              }
              return (
                <option key={index} value={currentTicket.id}>
                  {currentTicket.name}
                </option>
              );
            })}
          </select>
        </label>

        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Child ticket :</span>
          </div>
          <select
            className="select select-bordered w-full"
            {...register('childId')}
          >
            <option value={''}>None</option>
            {ticketList.map((currentTicket, index) => {
              if (ticket.id === currentTicket.id) {
                return null;
              }
              return (
                <option key={index} value={currentTicket.id}>
                  {currentTicket.name}
                </option>
              );
            })}
          </select>
        </label>

        <label className="label cursor-pointer form-control mt-9 flex-row">
          <span className="label-text">Blocked : </span>
          <input
            type="checkbox"
            className="checkbox"
            disabled={!isTodoTicket(ticket)}
            {...register('blocked')}
          />
        </label>
      </div>
      <input
        type="submit"
        className="btn btn-secondary mt-2"
        value="Edit ticket"
      />
    </form>
  );
};
