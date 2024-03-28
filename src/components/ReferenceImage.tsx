import { Link } from "react-router-dom";
import { XMarkIcon } from "@heroicons/react/24/outline";

interface Image {
  id: number;
  title: string;
  image_file: string;
  reference: number;
}

interface ReferenceImageProps {
  reference: Image;
  onDeleteItem: (reference: Image) => void;
  onMaximize: (reference: Image) => void;
  onThumbnailSet: (reference: Image) => void;
  editModus: boolean;
  id: number;
}

const ReferenceImage = ({
  reference,
  onDeleteItem,
  onMaximize,
  onThumbnailSet,
  editModus,
  id,
}: ReferenceImageProps) => {
  return (
    <div className="w-full min-w-[265px] max-w-[512px] flex-1 relative overflow-clip hover:scale-[101%] duration-100 cursor-pointer transition-transform ease-in-out  shadow-lg h-min object-cover">
      {/* delete cross */}
      {editModus && (
        // make image a thumbnail
        <div className="flex flex-row ">
          <button
            onClick={() => onThumbnailSet(reference)}
            className="absolute top-2 left-2 px-4 bg-brandprimary text-white rounded p-1 hover:bg-brandprimaryhover focus:bg-brandprimaryfocus"
          >
            Make Thumbnail
          </button>
          <button
            onClick={() => onDeleteItem(reference)}
            className="absolute top-2 right-2  bg-brandprimary text-white rounded-full p-1 hover:bg-red-600/50 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>
      )}
      <Link to={`#${reference.id}`} className="w-full">
        <img
          key={id}
          src={reference.image_file}
          className="rounded border w-full border-slate-50/10 "
          onClick={() => {
            onMaximize(reference);
          }}
        />
      </Link>
    </div>
  );
};

export default ReferenceImage;
