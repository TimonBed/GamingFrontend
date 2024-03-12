import { FilterInput } from "./FilterInput";
import { FilterTime } from "./FilterTime";

const Filter = () => {
  return (
    <div className="w-64 space-y-6">
      <div>
        <p className="m-2 text-md font-bold text-gray-300">Filter Game</p>
        <div className=" space-y-1">
          {/* input search for games */}
          <FilterInput name="Search Games" apiEndpoint="games" key="games" />
        </div>
      </div>
      <div>
        <p className="m-2 text-md font-bold text-gray-300">Filter Genre</p>
        <div className=" space-y-1">
          {/* input search for games */}
          <FilterInput
            name="Search Genres"
            apiEndpoint="game-categories"
            key="game-categories"
          />
        </div>
      </div>
      <div>
        <p className="m-2 text-md font-bold text-gray-300">Filter Developer</p>
        <div className=" space-y-1">
          {/* input search for games */}
          <FilterInput
            name="Search Developer"
            apiEndpoint="game-categories"
            key="game-categories"
          />
        </div>
      </div>

      <div>
        <p className="m-2 text-md font-bold text-gray-300">Filter Time</p>
        <div className=" space-y-1">
          {/* input search for games */}
          <FilterTime startYear={2016} key="game-categories" />
        </div>
      </div>
    </div>
  );
};

export default Filter;
