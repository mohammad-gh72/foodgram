import { useState } from "react";
import { usePost } from "src/features/post/PostContext";
import SelectImageFilesByButtonToUpload from "./SelectImageFilesByButtonToUpload";

function DragAndDropFile({
  text = "Drag your pictures here ",
  width = "60",
  bgColor = "#1CCA50",
  dragBgColor = "#9CCB90",
}) {
  const [isDragOver, setIsDragOver] = useState(false);
  const { state, dispatch } = usePost();

  function dragOver(e) {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  }
  function dragLeave(e) {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  }

  function drop(e) {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);

    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
    const allowedExtensions = ["jpg", "jpeg", "png"]; // Allowed file extensions

    const files = Array.from(e.dataTransfer.files);

    // Filter files by allowed MIME type AND extension
    const validFiles = files.filter((file) => {
      const fileExt = file.name.split(".").pop()?.toLowerCase();
      return (
        allowedTypes.includes(file.type) &&
        fileExt &&
        allowedExtensions.includes(fileExt)
      );
    });

    // Warn if any files were rejected
    if (validFiles.length < files.length) {
      alert("Only JPG, JPEG, and PNG images are allowed.");
    }

    // Filter out duplicates by name + size
    const nonDuplicateFiles = validFiles.filter(
      (file) =>
        !state.foodImages?.some(
          (img) => img.name === file.name && img.size === file.size
        )
    );

    // Limit total images to 10
    const remainingSlots = 10 - state.foodImages?.length;
    const filesToAdd = nonDuplicateFiles.slice(0, remainingSlots);

    if (filesToAdd.length < nonDuplicateFiles.length) {
      alert("You can only upload up to 10 images in total.");
    }

    dispatch({ type: "AddFoodImage", payload: filesToAdd });
  }

  return (
    <div className="flex flex-col w-full justify-center items-center min-h-[30%] gap-4">
      <div
        style={{
          width: `${width}%`,
          backgroundColor: isDragOver ? dragBgColor : bgColor,
        }}
        onDragOver={dragOver}
        onDragLeave={dragLeave}
        onDrop={drop}
        className={`${
          state.foodImages?.length === 0
            ? "flex justify-center items-center"
            : "grid grid-cols-5 gap-2"
        } p-4 rounded-2xl cursor-grab h-[100%]`}
      >
        {state.foodImages?.length === 0
          ? text
          : state.foodImages?.map((img, ind) => (
              <ShowReadyToUploadImages img={img} key={`${img.name}${ind}`} />
            ))}
      </div>
      <SelectImageFilesByButtonToUpload />
    </div>
  );
}

export default DragAndDropFile;

function ShowReadyToUploadImages({ img }) {
  const { dispatch } = usePost();
  return (
    <div className="relative">
      <img
        onClick={() => {
          dispatch({ type: "RemoveFoodItemImage", payload: img.id });
        }}
        draggable={false}
        src="./cancel.png"
        alt="cancel"
        className="absolute w-[30px] hover:scale-[1.1] cursor-pointer"
      />
      <img
        className="w-[50px]"
        src={img.url}
        draggable={false}
        alt={img.name}
      />
    </div>
  );
}
