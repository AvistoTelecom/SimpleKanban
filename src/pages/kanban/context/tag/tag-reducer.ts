import { LocalStorage } from '@utils/local-storage.utils';
import { TagAction } from './tag-action';
import { Tag } from '@model/tag/tag.type';

const addTag = (newTag: Tag): Tag[] => {
  LocalStorage.addTag(newTag);
  return LocalStorage.getTagList();
};

const updateTag = (tagName: string, newTag: Tag): Tag[] => {
  LocalStorage.updateTag(tagName, newTag);
  return LocalStorage.getTagList();
};

const deleteTag = (tagName: string): Tag[] => {
  LocalStorage.deleteTag(tagName);
  return LocalStorage.getTagList();
};

export const tagReducer = (_state: Tag[], action: TagAction): Tag[] => {
  switch (action.type) {
    case 'ADD-TAG':
      return addTag(action.payload);
    case 'UPDATE-TAG': {
      return updateTag(action.payload.name, action.payload.newTag);
    }
    case 'DELETE-TAG':
      return deleteTag(action.payload);
  }
};
