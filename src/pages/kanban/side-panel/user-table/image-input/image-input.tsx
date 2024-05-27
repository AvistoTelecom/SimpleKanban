import { SmallEditIcon } from '@components/edit-icon/edit-icon';
import { Image } from '@model/image/image.type';
import { ChangeEvent, FunctionComponent } from 'react';

type ImageInputProps = {
  image: Image;
  onChange: (image: string) => void;
};

export const ImageInput: FunctionComponent<ImageInputProps> = ({
  image,
  onChange,
}) => {
  const onSumbitImage = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const uploadedImage: File = event.target.files[0];
      const reader: FileReader = new FileReader();
      reader.onloadend = () => {
        const base64string: string = reader.result as string;
        onChange(base64string);
      };
      reader.readAsDataURL(uploadedImage);
    }
  };

  return (
    <label className="avatar w-12 h-12 cursor-pointer hover:text-accent">
      <div className="mask mask-squircle">
        <img src={image.src} alt="Avatar" />
      </div>
      <input
        type="file"
        className="hidden"
        onChange={onSumbitImage}
        value={''}
      />
      <span className="-top-1 left-9 absolute w-5 h-5 bg-neutral rounded-full flex items-center justify-center">
        <SmallEditIcon />
      </span>
    </label>
  );
};
