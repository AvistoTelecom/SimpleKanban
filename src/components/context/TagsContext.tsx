import { FunctionComponent, ReactNode, createContext, useState } from 'react';

export type Tag = {
  name: string;
  color: string;
};

export type TagsContextType = {
  tagList: Tag[];
  addTag: (tag: Tag) => void;
  deleteTag: (name: string) => void;
  updateTag: (name: string, tag: Tag) => void;
};

export const DEFAULT_TAG_COLOR: string = '#000000';

const defaultTagList: Tag[] = [
  {
    name: 'tag1',
    color: '#ff0000',
  },
  {
    name: 'tag2',
    color: '#00ff00',
  },
  {
    name: 'tag3',
    color: '#0000ff',
  },
];

export const TagsContext = createContext<TagsContextType>({
  tagList: [],
  addTag: () => {},
  updateTag: () => {},
  deleteTag: () => {},
});

const TagsContextProvider: FunctionComponent<{ children: ReactNode }> = ({
  children,
}) => {
  const [tagList, setTagList] = useState<Tag[]>(defaultTagList);

  const addTag = (newTag: Tag) => {
    const nameAlreadyExists = tagList.some((tag) => tag.name === newTag.name);
    if (nameAlreadyExists) {
      return;
    }
    setTagList((tagList) => [...tagList, newTag]);
  };

  const deleteTag = (name: string) => {
    setTagList((tagList) => tagList.filter((tag) => tag.name !== name));
  };

  const updateTag = (name: string, updatedTag: Tag) => {
    const tagIndex = tagList.findIndex((tag) => tag.name === name);
    if (tagIndex === -1) {
      return;
    }

    setTagList((tagList) => tagList.with(tagIndex, updatedTag));
  };

  return (
    <TagsContext.Provider
      value={{
        tagList,
        addTag,
        deleteTag,
        updateTag,
      }}
    >
      {children}
    </TagsContext.Provider>
  );
};

export default TagsContextProvider;
