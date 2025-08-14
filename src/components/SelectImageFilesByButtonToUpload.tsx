import { useRef } from "react";
import { usePost } from "src/features/post/PostContext";
function SelectImageFilesByButtonToUpload() {
  const fileRef = useRef(null);
  const { state, dispatch } = usePost();
  function openFileInput() {
    if (!fileRef.current) return;

    fileRef.current.click();
  }

  function handleSelectFiles(e) {
    e.preventDefault();
    e.stopPropagation();

    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
    const allowedExtensions = ["jpg", "jpeg", "png"]; // Allowed file extensions

    const files = Array.from(e.target.files);

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
    <div className="">
      <input
        multiple
        onChange={handleSelectFiles}
        type="file"
        name=""
        id=""
        className="hidden "
        ref={fileRef}
      />
      <button
        type="button"
        className="bg-amber-100 p-4 rounded-2xl cursor-pointer hover:scale-[1.1] transition-all duration-250"
        onClick={openFileInput}
      >
        Or click to select your files
      </button>
    </div>
  );
}
export default SelectImageFilesByButtonToUpload;
