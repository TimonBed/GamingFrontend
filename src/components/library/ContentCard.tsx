import landscape from "../../assets/landscape.webp";
import { Link } from "react-router-dom";

interface CategoryCardProps {
  title: string;
  link: string;
  preview_image?: string;
}

const ContentCard = ({
  title = "Error",
  link = "/",
  preview_image,
}: CategoryCardProps) => {
  return (
    <Link to={`/reference/${link}`} className="text-brandtext">
      <div className="max-w-[400px] w-[500px] shadow-lg shadow-black/20 border-2 border-slate-800/40 rounded-md overflow-hidden hover:brightness-125 hover:scale-[102%] transition-all duration-200 ease-in-out">
        <img
          className="object-cover w-full h-40 md:h-48 lg:h-64"
          src={preview_image || landscape}
          alt="img"
        />
        <div className="flex flex-col bg-slate-800 p-4">
          <div>
            <h4 className="text-lg font-bold">{title}</h4>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ContentCard;
