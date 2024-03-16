import {
  ArrowLongLeftIcon,
  ArrowLongRightIcon,
} from "@heroicons/react/24/outline";
import { Link, useParams } from "react-router-dom";
import EmbedYouTube from "../EmbedYouTube";
import MaxImage from "./MaxImage";
import { useEffect, useState } from "react";
import axios from "../../AxiosInterceptors";

interface Reference {
  id: number;
  name: string;
  game: string;
}

interface Game {
  id: number;
  game_category: string[];
  name: string;
  release_date: string;
}

const references = [
  {
    id: 1,
    link: "https://www.youtube.com/embed/JHiAWTH6ft0?si=sxymcRX-aHsDHJbh",
    isVideo: true,
  },
  {
    id: 2,
    link: "https://www.youtube.com/embed/JHiAWTH6ft0?si=sxymcRX-aHsDHJbh",
    isVideo: true,
  },
  {
    id: 3,
    link: "https://www.youtube.com/embed/JHiAWTH6ft0?si=sxymcRX-aHsDHJbh",
    isVideo: true,
  },
  {
    id: 4,
    link: "https://gaming-cdn.com/images/products/3298/screenshot/astroneer-pc-spiel-steam-wallpaper-5.jpg?v=1649408080",
    isVideo: false,
  },
];

const ReferenceDetail = () => {
  const onImageClose = () => {
    setIsMaximized(false);
    // remove # from url
    window.location.hash = "";
  };

  useEffect(() => {
    if (window.location.hash) {
      setIsMaximized(true);
    }
  }, []);

  const { id } = useParams();
  const [reference, setReference] = useState<Reference>();
  const [game, setGame] = useState<Game>();
  // get reference with id
  useEffect(() => {
    axios.get(`/references/references/${id}/`).then((res) => {
      setReference(res.data);
      console.log(res.data);
      axios.get(`/references/games/${res.data.game}/`).then((res) => {
        setGame(res.data);
      });
    });
  }, [id]);

  const formatReleaseDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const [isMaximized, setIsMaximized] = useState(false);
  return (
    <div className="pt-32 text-brandtext bg-slate-700">
      {/* maximized window popup */}
      {isMaximized ? (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-70">
          <MaxImage
            onClose={onImageClose}
            src="https://gaming-cdn.com/images/products/3298/screenshot/astroneer-pc-spiel-steam-wallpaper-5.jpg?v=1649408080"
          ></MaxImage>
        </div>
      ) : (
        <div></div>
      )}
      <hr className="my-4 border-slate-50/20 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-25 dark:opacity-100" />
      {/* nav section */}
      <section className=" max-w-[1500px] px-8 mx-auto">
        <div className="flex felx-row justify-between">
          <div className="flex flex-row space-x-16">
            {/* back button with arrow */}
            <Link
              to="/library"
              className="flex items-center flex-row space-x-2 bg-brandprimary hover:bg-brandprimaryhover active:bg-brandprimaryactive text-brandtext font-bold py-1 px-4 rounded-md"
            >
              <ArrowLongLeftIcon className="h-6 w-6" />
              <p>Back</p>
            </Link>
            {/* breadcrumb */}
            <nav className="flex" aria-label="Breadcrumb">
              <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                <li className="inline-flex items-center">
                  <Link
                    to="/"
                    className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-brandtext"
                  >
                    <svg
                      className="w-3 h-3 me-2.5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                    </svg>
                    Home
                  </Link>
                </li>
                <li>
                  <div className="flex items-center">
                    <svg
                      className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 6 10"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="m1 9 4-4-4-4"
                      />
                    </svg>
                    <Link
                      to="../library"
                      className="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-brandtext"
                    >
                      Library
                    </Link>
                  </div>
                </li>
                <li aria-current="page">
                  <div className="flex items-center">
                    <svg
                      className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 6 10"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="m1 9 4-4-4-4"
                      />
                    </svg>
                    <span className="ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400">
                      {reference?.name}
                    </span>
                  </div>
                </li>
              </ol>
            </nav>
          </div>

          {/* next prev buttons */}
          <div className="inline-flex space-x-1">
            <button className="flex flex-row space-x-2 bg-brandprimary hover:bg-brandprimaryhover active:bg-brandprimaryactive text-brandtext font-bold py-1 px-4 rounded-l-md">
              <ArrowLongLeftIcon className="h-6 w-6" />
              <p>Last</p>
            </button>
            <button className=" flex flex-row space-x-2 bg-brandprimary hover:bg-brandprimaryhover active:bg-brandprimaryactive text-brandtext font-bold py-1 px-4 rounded-r-md">
              <p>Next</p>
              <ArrowLongRightIcon className="h-6 w-6" />
            </button>
          </div>
        </div>
      </section>
      <hr className="my-4 border-slate-50/20 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-25 dark:opacity-100" />
      {/* content section */}
      <section className="max-w-[1500px] mx-auto mt-12  px-8 items-center">
        <div className="flex flex-row space-x-8">
          <div className="w-3/4 flex flex-wrap gap-2">
            {/* embedd yt video */}
            {references.map((reference, index) =>
              reference.isVideo ? (
                <div
                  key={index}
                  className="rounded-md border min-h-64 border-slate-50/10 overflow-clip shadow-lg w-full max-w-[512px] h-[288px]"
                >
                  <EmbedYouTube src={reference.link}></EmbedYouTube>
                </div>
              ) : (
                <Link to={`#${reference.id}`}>
                  <img
                    key={index}
                    src={reference.link}
                    className="rounded-md border border-slate-50/10 overflow-clip hover:scale-[101%] duration-100 cursor-pointer transition-transform ease-in-out  shadow-lg w-min h-min max-w-[512px] max-h-[288px] object-cover"
                    onClick={() => {
                      setIsMaximized(true);
                    }}
                  />
                </Link>
              )
            )}
          </div>
          <div className="w-1/4">
            <div className="flex flex-col space-y-4">
              <div>
                <h1 className="uppercase">{reference?.name ?? "Error"}</h1>
                <h2>{reference?.game ?? "Error"}</h2>
                <p>Reference Description</p>
              </div>
              <hr className="my-4 border-slate-50/20 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-25 dark:opacity-100" />
              <div>
                <p>
                  Released: {formatReleaseDate(game?.release_date ?? "Error")}
                </p>
              </div>
              <hr className="my-4 border-slate-50/20 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-25 dark:opacity-100" />
              {/* tags */}
              <div className="flex flex-wrap gap-2">
                {game?.game_category.map((tag) => (
                  <Link
                    to="/library"
                    className="rounded-md border border-slate-50/10 min-w-16 text-center p-1 my-auto text-sm bg-brandprimary/40 hover:bg-brandprimaryhover active:bg-brandprimaryactive"
                  >
                    <p>{tag}</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      <hr className="my-4 border-slate-50/20 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-25 dark:opacity-100" />
    </div>
  );
};

export default ReferenceDetail;
