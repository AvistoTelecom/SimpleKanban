import { CreateImage } from '@model/image/create-image/create-image.type';
import { Image } from '@model/image/image.type';
import { LocalStorage } from '@utils/local-storage.utils';
import { ImageAction } from './image-action';
import { Reducer } from 'react';
import { ImageReducerState } from './image-context';

const addImage = (newImage: CreateImage): ImageReducerState => {
  const newImageId = LocalStorage.addImage(newImage);
  return {
    imageList: LocalStorage.getImageList(),
    lastAddedImageId: newImageId,
  };
};

const updateImage = (updatedImage: Image): ImageReducerState => {
  LocalStorage.updateImage(updatedImage);
  return {
    imageList: LocalStorage.getImageList(),
  };
};

const deleteImage = (id: string): ImageReducerState => {
  LocalStorage.deleteImage(id);
  return {
    imageList: LocalStorage.getImageList(),
  };
};

export const imageReducer: Reducer<ImageReducerState, ImageAction> = (
  _state: {
    imageList: Image[];
    lastAddedImageId?: string;
  },
  action: ImageAction
): ImageReducerState => {
  switch (action.type) {
    case 'ADD-IMAGE':
      return addImage(action.payload);
    case 'UPDATE-IMAGE':
      return updateImage(action.payload);
    case 'DELETE-IMAGE':
      return deleteImage(action.payload);
  }
};
