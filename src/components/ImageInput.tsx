import { ChangeEvent, FunctionComponent, useState } from 'react';

interface ImageInputProps {
  profilePicture: string;
}

export const ImageInput: FunctionComponent<ImageInputProps> = ({
  profilePicture,
}) => {
  const [image, setImage] = useState(profilePicture);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const uploadedImage = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64string = reader.result as string;
        setImage(base64string);
        // TODO : update image in localstorage
      };
      reader.readAsDataURL(uploadedImage);
    }
  };

  return (
    <div className="avatar">
      <label className="mask mask-squircle w-12 h-12 cursor-pointer">
        <img src={image} alt="Avatar" />
        <input type="file" className="hidden" onChange={handleImageChange} />
      </label>
    </div>
  );
};
