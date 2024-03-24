import { useLocation } from "react-router-dom";
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
    <div className="bg-brandgray-900 text-brandtext h-full">
      <div className="max-w-[2100px]  mb-8 mx-auto items-center">
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
            <div className="p-8 rounded-md shadow-lg shadow-black/20 bg-brandgray-850 h-min">
              <h3>Filter</h3>
              <Filter />
            </div>
            <div>
              <div className="flex flex-wrap h-min gap-6 justify-center items-top">
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
