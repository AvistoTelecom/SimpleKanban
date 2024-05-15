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
  imageList: Image[];
  dispatchImageList: Dispatch<ImageAction>;
};

export const DEFAULT_PROFILE_PICTURE: string =
  'https://docs.material-tailwind.com/img/face-2.jpg';

export const ImageContext = createContext<ImageContextType>({
  imageList: [],
  dispatchImageList: () => {},
});

export const ImageContextProvider: FunctionComponent<{
  children: ReactNode;
}> = ({ children }) => {
  const [imageList, dispatchImageList] = useReducer(
    imageReducer,
    LocalStorage.getImageList()
  );

  return (
    <ImageContext.Provider value={{ imageList, dispatchImageList }}>
      {children}
    </ImageContext.Provider>
  );
};
