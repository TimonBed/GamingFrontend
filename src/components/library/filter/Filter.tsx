import { FilterInput } from "./FilterInput";
import { FilterTime } from "./FilterTime";

const Filter = () => {
  return (
    <div className="w-64 space-y-6 select-none">
      <div>
        <p className="m-2 text-md font-bold text-brandtext">Filter Game</p>
        <div className=" space-y-1">
          {/* input search for games */}
          <FilterInput
            name="Search Games"
            apiEndpoint="references/games/"
            key="games"
          />
        </div>
      </div>
      <div>
        <p className="m-2 text-md font-bold text-brandtext">Filter Genre</p>
        <div className=" space-y-1">
          {/* input search for games */}
          <FilterInput
            name="Search Genres"
            apiEndpoint="references/game-categories/"
            key="game-categories"
          />
        </div>
      </div>
      <div>
        <p className="m-2 text-md font-bold text-brandtext">Filter Developer</p>
        <div className=" space-y-1">
          {/* input search for games */}
          <FilterInput
            name="Search Developer"
            apiEndpoint="references/game-categories/"
            key="game-categories"
          />
        </div>
      </div>

      <div>
        <p className="m-2 text-md font-bold text-brandtext">Filter Time</p>
        <div className=" space-y-1">
          {/* input search for games */}
          <FilterTime startYear={2016} key="game-categorie" />
        </div>
      </div>
    </div>
  );
};

export default Filter;
