import { ImageCreate } from '@model/image/create-image/create-image.type';
import { Image } from '@model/image/image.type';

export type ImageAction =
  | { type: 'ADD-IMAGE'; payload: ImageCreate }
  | { type: 'UPDATE-IMAGE'; payload: Image }
  | { type: 'DELETE-IMAGE'; payload: string };
