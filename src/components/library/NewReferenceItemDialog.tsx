import axios from "../../AxiosInterceptors";
import { useState } from "react";

interface NewReferenceItemDialogProps {
  game: string;
  refresh: () => void;
}

export const NewReferenceItemDialog = ({
  game,
  refresh,
}: NewReferenceItemDialogProps) => {
  const [files, setFiles] = useState<FileList | null>(null);

  const handleAddReference = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    for (let i = 0; i < files!.length; i++) {
      const formData = new FormData();
      formData.append("title", "test");
      console.log(files![i] instanceof File);
      formData.append("image_file", files![i]);
      formData.append("reference_image", "1");

      await axios
        .post("/references/images/", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          if (response.status === 201) {
            refresh();
          }
        })
        .catch((error) => {
          console.error("Error adding reference:", error);
        });
    }
  };
  const handleFilesChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(e.target.files);
    }
  };

  return (
    <div className="text-brandtext">
      <h3 className="my-auto text-center mt-8">Add Reference</h3>
      <form className="w-full p-8 space-y-6" onSubmit={handleAddReference}>
        <label htmlFor="name">Game: {game}</label>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            className="mt-2 block h-9 w-full rounded-md border-0 bg-brandgray-700 py-1.5 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
            type="text"
            id="name"
            required
          />
        </div>
        <div>
          <label htmlFor="game">Image:</label>
          <input
            type="file"
            multiple
            onChange={handleFilesChanged}
            accept=".jpg, .jpeg, .webp"
            name="small-file-input"
            id="small-file-input"
            className="h-9 mt-2 block w-full rounded-md border-0 bg-brandgray-700 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6
              file:bg-brandprimary file:border-0
              file:me-4 file:h-full
              file:py-2 file:px-4 hover:file:bg-brandprimaryhover file:text-brandtext focus:file:bg-brandprimaryactive  hover:file:border-0"
          ></input>
        </div>
        <div className="flex justify-end">
          <button
            className="mt-4 h-full bg-brandprimary  p-3 rounded-md hover:bg-brandprimaryhover  active:bg-brandprimaryactive"
            type="submit"
          >
            Add Image to Reference
          </button>
        </div>
      </form>
    </div>
  );
};
