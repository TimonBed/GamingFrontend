import { Link } from "react-router-dom";
import axios from "../../../AxiosInterceptors";
import { useEffect, useState } from "react";

interface Reference {
  id: number;
  name: string;
  game: string;
}

const ReferencesPage = () => {
  const [categories, setCategories] = useState<Reference[]>([]);

  useEffect(() => {
    axios.get("/references/references/").then((res) => {
      setCategories(res.data);
      console.log(res.data);
    });
  }, []);

  return (
    <div className="p-16 bg-slate-800 w-full text-brandtext">
      <div className="flex flex-row space-x-16">
        <h1 className=" my-auto text-left">References</h1>
        <button className=" my-auto h-full bg-brandprimary text-white p-3 rounded-md hover:bg-brandprimaryhover  active:bg-brandprimaryactive">
          Add Reference
        </button>
      </div>
      <table className="table-auto ">
        <thead>
          <tr>
            <th className="px-6 py-2">ID</th>
            <th className="px-6 py-2">Name</th>
            <th className="px-6 py-2">Game</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr
              className="border-b-2 border-gray-600 transition-colors"
              key={category.id}
            >
              <td className="px-6 py-2">{category.id}</td>
              <td className="px-6 py-2">
                <Link to={category.id.toString()}>{category.name}</Link>
              </td>
              <td className="px-6 py-2">{category.game}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReferencesPage;
