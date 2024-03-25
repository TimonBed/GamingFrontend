import { Link } from "react-router-dom";
import landscape from "../../assets/landscape.webp";
import CategoryCard from "../library/CategoryCard";
import HeroElement2 from "./HeroElement2";

const categories = [
  {
    title: "Platzhalter",
    description: "Platzhalter",
    link: "/library#library",
  },
  {
    title: "Platzhalter",
    description: "Platzhalter",
    link: "/library#library",
  },
  {
    title: "Platzhalter",
    description: "Platzhalter",
    link: "/library#library",
  },
];

export default function Hero() {
  return (
    <div className="bg-brandgray-800">
      <div className="relative isolate overflow-hidden pt-14">
        <img
          src={landscape}
          alt=""
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        />
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
        <div className="mx-auto max-w-2xl py-8 sm:py-16 lg:pt-32 lg:pb-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-brandtext sm:text-6xl">
              Gaming References
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              The Reference Library for your Game Development Journey.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6 select-none">
              <Link
                to="/library"
                className="rounded-md bg-brandprimary px-3.5 py-2.5 text-sm font-semibold text-brandtext shadow-sm hover:bg-brandprimaryhover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brandprimary-400"
              >
                Get started
              </Link>
              <Link
                to="#"
                className="text-sm font-semibold leading-6 text-brandtext"
              >
                Learn more <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
        <div className="flex flex-col m-32">
          <h3 className="text-brandtext text-left">Trending</h3>
          <div className="flex flex-row space-x-8 ">
            {categories.map((category) => (
              <CategoryCard
                key={category.title}
                title={category.title}
                description={category.description}
                link={category.link}
              />
            ))}
          </div>
        </div>
        <div
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
      </div>
      <div className=" flex flex-col mx-auto my-32">
        <HeroElement2></HeroElement2>
      </div>
    </div>
  );
}
