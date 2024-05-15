import { ImageCreate } from '@model/image/create-image/create-image.type';
import { Image } from '@model/image/image.type';
import { LocalStorage } from '@utils/localStorage.utils';
import { ImageAction } from './image-action';

const addImage = (newImage: ImageCreate): Image[] => {
  LocalStorage.addImage(newImage);
  return LocalStorage.getImageList();
};

const updateImage = (updatedImage: Image): Image[] => {
  LocalStorage.updateImage(updatedImage);
  return LocalStorage.getImageList();
};

const deleteImage = (id: string): Image[] => {
  LocalStorage.deleteImage(id);
  return LocalStorage.getImageList();
};

export const imageReducer = (_state: Image[], action: ImageAction): Image[] => {
  switch (action.type) {
    case 'ADD-IMAGE':
      return addImage(action.payload);
    case 'UPDATE-IMAGE':
      return updateImage(action.payload);
    case 'DELETE-IMAGE':
      return deleteImage(action.payload);
  }
};
