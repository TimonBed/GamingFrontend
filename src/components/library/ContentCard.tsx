import landscape from "../../assets/landscape.webp";
import { Link } from "react-router-dom";

interface CategoryCardProps {
  title: string;
  description: string;
  link: string;
  developer: string;
  releaseDate: string;
}

const ContentCard = ({
  title = "Error",
  description = "Error",
  link = "/",
  developer = "Error",
  releaseDate = "Error",
}: CategoryCardProps) => {
  return (
    <Link to={`/reference/${link}`} className="text-brandtext">
      <div className="max-w-[400px] w-[500px] border-2 border-slate-800/40 rounded-md overflow-hidden hover:brightness-125 hover:scale-[102%] transition-all duration-200 ease-in-out">
        <img
          className="object-cover w-full h-40 md:h-48 lg:h-64"
          src={landscape}
          alt="img"
        />
        <div className="flex flex-col bg-slate-800 p-4">
          <div>
            <h4 className="text-lg font-bold">{title}</h4>
            <p className="text-sm min-h-10">{description}</p>
          </div>
          <hr className="border-slate-50/60 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-25 dark:opacity-100" />
          <div className="flex flex-col space-y-2">
            <p className="text-sm min-h-10">{developer}</p>
            <p className="text-sm min-h-10">{releaseDate}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ContentCard;
