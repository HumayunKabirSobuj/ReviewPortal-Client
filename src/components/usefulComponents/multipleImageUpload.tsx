/* eslint-disable prefer-const */
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface ImageListProps {
  setImageLinks: React.Dispatch<React.SetStateAction<string[]>>;
}
export function UploadMultipleImages({ setImageLinks }: ImageListProps) {
  const [imageList, setImageList] = useState<File[]>([]);
  const [getView, setGetView] = useState<string[]>([]);

  const ImgChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const fileArray = Array.from(files);
    setImageList(fileArray);

    const previewUrls = fileArray.map((file) => URL.createObjectURL(file));
    setGetView(previewUrls);
  };

  const handleUpload = async () => {
    const formData = new FormData();

    formData.append(
      "upload_preset",
      process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME!,
    );
    formData.append(
      "cloud_name",
      process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!,
    );
    // const result = await Promise.all(
    // 	// only map section starts
    // 	files.map(async (file: any, index: number) => {
    // 		const imageName = `${user.userId}-${index}`;
    // 		const path = file?.path;

    // 		//send image to cloudinary
    // 		const { secure_url } = await sendImageToCloudinary(imageName, path);
    // 		return await CarouselModel.create({ image: secure_url });
    // 	}),
    // );
    let images: string[] = [];
    try {
      await Promise.all(
        imageList.map(async (image) => {
          formData.append(`file`, image);
          const res = await fetch(
            `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
            {
              method: "POST",
              body: formData,
            },
          );
          const resp = await res.json();
          images.push(resp.secure_url);
        }),
      );
      console.log("images", images);
      setImageLinks(images);
    } catch (err) {
      console.log(err);
    }

    console.log("total", imageList.length, "images");
  };

  return (
    <div className="flex flex-col gap-4">
      <Label htmlFor="multi-image">Upload Images</Label>
      <Input
        id="multi-image"
        type="file"
        accept="image/*"
        multiple
        onChange={ImgChangeHandler}
      />

      {getView.length > 0 && (
        <div className="flex gap-2 flex-wrap">
          {getView.map((src, idx) => (
            <Image
              key={idx}
              src={src}
              height={400}
              width={400}
              alt={`Preview ${idx}`}
              className="w-24 h-24 object-cover rounded-md border"
            />
          ))}
        </div>
      )}

      <Button
        onClick={handleUpload}
        disabled={getView.length === 0}
        className="w-[150px]"
      >
        Upload Image
      </Button>
    </div>
  );
}
