import { Link } from "react-router-dom";

const HeroElement2 = () => {
  return (
    <section className=" text-brandtext">
      <div className="flex flex-row space-x-32 ml-[256px] items-center">
        <div className="flex-1 flex-col space-y-6">
          <p className="text-indigo-500">EXPLORE GAME MECHANICS</p>
          <h2 className="left items-left justify-left text-left ">
            EXPLORE GAME MECHANICS
          </h2>
          <p className="left items-left justify-left text-left pb-6 text-lg">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nihil
            beatae, quibusdam incidunt sint ipsum amet! Corrupti autem
            accusantium quasi quisquam! Ullam nulla in iusto, ipsum itaque quod
            sequi vel facere ducimus eaque? Ducimus doloribus fugit magni earum
            repellendus. Cum incidunt consequuntur impedit sequi perspiciatis ab
            nisi enim doloribus ipsam ullam dolor accusamus, ducimus facere
            alias harum maiores aliquid repellendus similique repudiandae vero.
            Fugit, totam vero. Tempore, cumque provident! Eligendi, doloremque,
            a fuga numquam ad ipsam animi reiciendis rerum mollitia amet nemo
            adipisci quibusdam aliquam exercitationem praesentium voluptatem
            esse illum explicabo repellat tempora tenetur officia architecto
            aspernatur. Recusandae consequatur fuga hic.
          </p>
          <Link
            to="/library"
            className="w-fit rounded-md bg-brandprimary px-3.5 py-2.5 text-sm font-semibold text-brandtext shadow-sm hover:bg-brandprimaryhover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brandprimaryfocus"
          >
            Explore References
          </Link>
        </div>
        <div className=" flex-shrink flex-col">
          <img
            src="https://placehold.co/800x800"
            alt="Game Mechanics"
            className=" object-cover rounded-md"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroElement2;
