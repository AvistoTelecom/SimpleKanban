import {
  Dispatch,
  FunctionComponent,
  ReactNode,
  createContext,
  useReducer,
} from 'react';
import { Tag } from '../../model/Tag';
import { tagReducer } from './TagReducer';
import { TagAction } from './TagAction';
import { LocalStorage } from '../../localStorage';

export type TagContextType = {
  tagList: Tag[];
  dispatchTagList: Dispatch<TagAction>;
};

export const DEFAULT_TAG_COLOR: string = '#000000';

export const TagContext = createContext<TagContextType>({
  tagList: [],
  dispatchTagList: () => {},
});

export const TagContextProvider: FunctionComponent<{ children: ReactNode }> = ({
  children,
}) => {
  const [tagList, dispatchTagList] = useReducer(
    tagReducer,
    LocalStorage.getTagList()
  );

  return (
    <TagContext.Provider value={{ tagList, dispatchTagList }}>
      {children}
    </TagContext.Provider>
  );
};
