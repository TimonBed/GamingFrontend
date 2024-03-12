import { useLocation } from "react-router-dom";
import ContentCard from "./ContentCard";
import Filter from "./filter/Filter";
import { useEffect } from "react";
import Pagination from "./Pagination";

const content = [
  {
    title: "Inventory",
    description: "Inventory System",
    link: "/library/1",
    developer: "Error",
    releaseDate: "Error",
  },
  {
    title: "Movement",
    description: "Player Movement",
    link: "/library/2",
    developer: "Error",
    releaseDate: "Error",
  },
  {
    title: "UI/UX",
    description: "User Interface and User Experience Design",
    link: "/library/3",
    developer: "Error",
    releaseDate: "Error",
  },
  {
    title: "Interaction",
    description: "World Interaction",
    link: "/library/4",
    developer: "Error",
    releaseDate: "Error",
  },
  {
    title: "Physics",
    description: "Game Physics",
    link: "/library/5",
    developer: "Error",
    releaseDate: "Error",
  },
  {
    title: "Physics",
    description: "Game Physics",
    link: "/library/6",
    developer: "Error",
    releaseDate: "Error",
  },
];

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

  return (
    <div className="bg-gray-900 text-brandtext">
      <div className="max-w-[2100px] mx-auto items-center">
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
          <div className="flex flex-row mx-8 mt-16 ">
            <div className="p-8 rounded-md bg-slate-800/50 h-min">
              <h3>Filter</h3>
              <Filter />
            </div>
            <div>
              <div className="flex flex-wrap h-min gap-6 justify-center items-top">
                {content.map((content) => (
                  <ContentCard
                    key={content.title}
                    title={content.title}
                    description={content.description}
                    link={content.link}
                    developer={content.developer}
                    releaseDate={content.releaseDate}
                  />
                ))}
              </div>
              <hr className="mt-8 border-slate-50/60 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-25 dark:opacity-100" />
              <div className="flex justify-center w-full m-8">
                <Pagination />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Library;
