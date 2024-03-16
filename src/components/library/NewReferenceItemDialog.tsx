const NewReferenceItemDialog = () => {
  return (
    <div>
      <h3 className="my-auto text-center mt-8">Add Reference</h3>
      <form className="w-full p-8 space-y-6">
        <div>
          <label htmlFor="name">Name:</label>
          <input
            className="mt-2 block w-full rounded-md border-0 bg-gray-700 py-1.5 text-brandtext shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
            type="text"
            id="name"
            required
          />
        </div>
        <div>
          <label htmlFor="game">Image Link:</label>
          <input
            className="mt-2 block w-full rounded-md border-0 bg-gray-700 py-1.5 text-brandtext shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
            type="text"
            id="game"
            required
          />
        </div>
        <div className="flex justify-end">
          <button
            className="mt-4 h-full bg-brandprimary text-white p-3 rounded-md hover:bg-brandprimaryhover  active:bg-brandprimaryactive"
            type="submit"
          >
            Add Image to Reference
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewReferenceItemDialog;
