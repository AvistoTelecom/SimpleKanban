import { Image } from '@model/image/image.type';
import {
  Dispatch,
  FunctionComponent,
  ReactNode,
  createContext,
  useReducer,
} from 'react';
import { ImageAction } from './image-action';
import { imageReducer } from './image-reducer';
import { LocalStorage } from '@utils/localStorage.utils';

export type ImageContextType = {
  imageReducerState: ImageReducerState;
  dispatchImageList: Dispatch<ImageAction>;
};

export type ImageReducerState = {
  imageList: Image[];
  lastAddedImageId?: string;
};

export const DEFAULT_PROFILE_PICTURE: Image = {
  id: 'default',
  data: 'https://docs.material-tailwind.com/img/face-2.jpg',
};

export const ImageContext = createContext<ImageContextType>({
  imageReducerState: {
    imageList: [],
  },
  dispatchImageList: () => {},
});

export const ImageContextProvider: FunctionComponent<{
  children: ReactNode;
}> = ({ children }) => {
  const [imageReducerState, dispatchImageList] = useReducer(imageReducer, {
    imageList: LocalStorage.getImageList(),
  });

  return (
    <ImageContext.Provider value={{ imageReducerState, dispatchImageList }}>
      {children}
    </ImageContext.Provider>
  );
};
