import { useParams } from "react-router-dom";
import axios from "../../../AxiosInterceptors";
import { useEffect, useState } from "react";

interface Reference {
  id: number;
  name: string;
  game: string;
}

interface Game {
  id: number;
  game_category: string;
  name: string;
  release_date: string;
}

const AdminReferences = () => {
  const { id } = useParams();
  const [reference, setReference] = useState<Reference>();
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    axios.get(`/references/references/${id}/`).then((res) => {
      setReference(res.data);
    });
  }, [id]);

  useEffect(() => {
    axios.get("/references/games/").then((res) => {
      setGames(res.data);
    });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("submit");
  };

  return (
    <div className="p-16 bg-slate-800 w-full text-brandtext">
      <div className="flex flex-row space-x-16">
        <h1 className="my-auto text-left">Reference {reference?.name}</h1>
      </div>
      <form onSubmit={handleSubmit} className="w-full">
        <div className="space-y-6 my-4 max-w-[512px]">
          <div>ID: {reference?.id}</div>
          <div>
            <label htmlFor="username">Name:</label>
            <input
              className="mt-2 block w-full rounded-md border-0 bg-gray-700 py-1.5 text-brandtext shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
              type="text"
              id="username"
              value={reference?.name}
              required
            />
          </div>
          <div>
            <label htmlFor="game">Game:</label>
            <select
              className="mt-2 block w-full rounded-md border-0 bg-gray-700 py-1.5 text-brandtext shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
              id="game"
              required
            >
              {games.map((game) => (
                <option key={game.id} value={game.id}>
                  {game.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <button
              type="submit"
              className="bg-brandprimary text-white p-2 px-8 rounded-md hover:bg-brandprimaryhover active:bg-brandprimaryactive"
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AdminReferences;
