import axios from "axios";
import { useEffect, useState } from "react";
import GameCoverTile from "./GameTile";

interface Game {
  id: number;
  name: string;
  game_category: string;
  release_date: string;
  image: string;
}

export const GameMain = () => {
  const [games, setGames] = useState<Game[]>([]);
  useEffect(() => {
    axios.get<Game[]>("http://localhost:8000/games").then((response) => {
      console.log(response);
      setGames(response.data);
    });
  }, []);
  return (
    <div className="bg-brandgray-900 text-brandtext">
      <div className="mt-32 mx-8 max-w-[1500px] sm:mx-auto items-center flex flex-col">
        <h1>References Of Games</h1>

        {/* wrap games list */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-8">
          {games.map((game) => (
            <GameCoverTile key={game.id} game={game} />
          ))}
        </div>
      </div>
    </div>
  );
};
