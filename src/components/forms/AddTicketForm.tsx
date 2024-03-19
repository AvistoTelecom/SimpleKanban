import { FunctionComponent } from 'react';
import { CreateTicket } from '../../model/CreateTicket';
import { User } from '../../model/User';
import { Tag } from '../../model/Tag';
import { useForm, SubmitHandler } from 'react-hook-form';
import { TicketType } from '../KanbanPage';

type AddTicketFormProps = {
  userList: User[];
  tagList: Tag[];
  defaultType: string;
  onAddTicket: (ticket: CreateTicket) => void;
};

type CreateTicketFormInput = {
  name: string;
  storyPoint: number;
  assigneId?: number;
  tagName?: string;
  description: string;
  parentId?: number;
  childId?: number;
  type: TicketType;
};

export const AddTicketForm: FunctionComponent<AddTicketFormProps> = ({
  userList,
  tagList,
}) => {
  const { register, handleSubmit } = useForm<CreateTicketFormInput>({
    defaultValues: {
      name: 'Ticket',
      storyPoint: 0,
      assigneId: undefined,
      tagName: undefined,
      description: '',
      parentId: undefined,
      childId: undefined,
    },
  });

  const onSubmit: SubmitHandler<CreateTicketFormInput> = (data) => {
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col w-full gap-5 items-center py-2 overflow-y-auto max-h-full"
    >
      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">Name :</span>
        </div>
        <input
          type="text"
          placeholder="Title..."
          className="input input-bordered input-sm w-full max-w-xs"
          {...register('name')}
        />
      </label>

      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">Story Points :</span>
        </div>
        <input
          type="number"
          placeholder="Points..."
          className="input input-bordered input-sm w-full max-w-xs"
          {...register('storyPoint')}
        />
      </label>

      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">Description :</span>
        </div>
        <textarea
          className="textarea textarea-bordered"
          placeholder="Description..."
          {...register('description')}
        />
      </label>

      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">Assignee :</span>
        </div>
        <select
          className="select select-bordered w-full max-w-xs"
          {...register('assigneId')}
        >
          <option>None</option>
          {userList.map((user, index) => (
            <option key={index} value={user.name}>
              {user.name}
            </option>
          ))}
        </select>
      </label>

      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">Tag :</span>
        </div>
        <select
          className="select select-bordered w-full max-w-xs"
          {...register('tagName')}
        >
          <option>None</option>
          {tagList.map((tag, index) => (
            <option key={index} value={tag.name}>
              {tag.name}
            </option>
          ))}
        </select>
      </label>

      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">Parent ticket :</span>
        </div>
        <select
          className="select select-bordered w-full max-w-xs"
          {...register('parentId')}
        >
          <option>None</option>
          {tagList.map((tag, index) => (
            <option key={index} value={tag.name}>
              {tag.name}
            </option>
          ))}
        </select>
      </label>

      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">Child ticket :</span>
        </div>
        <select
          className="select select-bordered w-full max-w-xs"
          {...register('childId')}
        >
          <option>None</option>
          {tagList.map((tag, index) => (
            <option key={index} value={tag.name}>
              {tag.name}
            </option>
          ))}
        </select>
      </label>

      <input type="submit" className="btn btn-primary" />
    </form>
  );
};
