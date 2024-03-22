import { Tag } from '../../model/Tag';
import { TagAction } from './TagAction';

const updateTag = (state: Tag[], name: string, newTag: Tag) => {
  const tagIndex = state.findIndex((tag) => tag.name === name);
  if (tagIndex === -1) {
    return;
  }
  return state.with(tagIndex, newTag);
};

export const tagReducer = (state: Tag[], action: TagAction): Tag[] => {
  switch (action.type) {
    case 'ADD-TAG':
      return [...state, action.payload];
    case 'UPDATE-TAG': {
      const updatedTag = updateTag(
        state,
        action.payload.name,
        action.payload.newTag
      );
      return updatedTag ? updatedTag : state;
    }
    case 'DELETE-TAG':
      return state.filter((tag) => tag.name !== action.payload);
  }
};
