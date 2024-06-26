import { useLocation, useNavigate } from "react-router-dom";
import ContentCard from "./ContentCard";
import Filter from "./filter/Filter";
import { useEffect, useState } from "react";
import Pagination from "./Pagination";
import axios from "../../AxiosInterceptors";

interface Reference {
  id: number;
  name: string;
  game: string;
  preview_image: string;
}

const Library = () => {
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.slice(1));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location.hash]);

  const [References, setReferences] = useState<Reference[]>([]);
  useEffect(() => {
    axios.get("/references/references/").then((res) => {
      if (res && res.data) {
        setReferences(res.data);
      }
    });
  }, []);

  return (
    <div className="bg-brandgray-700 text-brandtext ">
      <div className="max-w-[2100px] mb-8 mx-auto items-center">
        <div className="pt-32 mx-8 max-w-[1500px] sm:mx-auto items-center flex flex-col">
          <h1 className="text-4xl font-bold tracking-tight">
            Game Mechanics Reference Library
          </h1>
          <p className="mt-6 text-lg leading-8">
            Library of References for Game Mechanics, Game Design, Game
            Development, and Game Art.
          </p>
        </div>

        <section id="library">
          <div className="flex flex-row mx-8 mt-16 space-x-8">
            <div className="p-8 rounded shadow-lg shadow-black/20 bg-brandgray-750 h-min">
              {/* add new reference */}
              <button
                onClick={() => navigate("/reference/new")}
                className="bg-brandprimary text-white p-3 w-full mb-8 rounded hover:bg-brandprimaryhover active:bg-brandprimaryactive"
              >
                Upload New Reference
              </button>
              {/* filter */}
              <h3>Filter</h3>
              <Filter />
            </div>
            <div className="">
              <div className="flex flex-wrap gap-6">
                {References.map((reference) => (
                  <ContentCard
                    key={reference.id}
                    title={reference.name}
                    link={reference.id.toString()}
                    preview_image={reference.preview_image}
                  />
                ))}
              </div>
              {References.length > 40 ? (
                <div className="flex justify-center w-full m-8">
                  <hr className="mt-8 border-slate-50/60 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-25 dark:opacity-100" />
                  <Pagination />
                </div>
              ) : null}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Library;
