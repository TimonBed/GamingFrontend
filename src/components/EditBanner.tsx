interface EditBannerProps {
  onCancel: () => void;
  onSave: () => void;
}

const EditBanner = ({ onCancel, onSave }: EditBannerProps) => {
  return (
    <div className=" absolute inset-0 mt-16 bg-brandprimary/40 h-min text-center font-bold text-lg justify-center">
      Edit Modus
      <button
        onClick={onCancel}
        className="bg-brandgray-700 shadow shadow-brandgray-750 text-white m-2 p-1 px-8 rounded hover:bg-brandgray-700 active:bg-brandgray-900"
      >
        Cancel
      </button>
      <button
        onClick={onSave}
        className="bg-brandgray-700 shadow shadow-brandgray-750 text-white m-2 p-1 px-8 rounded hover:bg-brandgray-700 active:bg-brandgray-900"
      >
        Save
      </button>
    </div>
  );
};

export default EditBanner;
