import landscape from "../../assets/landscape.webp";
import { Link } from "react-router-dom";

interface CategoryCardProps {
  title: string;
  description: string;
  link: string;
}

const CategoryCard = ({
  title = "Error",
  description = "Error",
  link = "/",
}: CategoryCardProps) => {
  return (
    <Link to={link} className="text-brandtext w-full ">
      <div className="flex bg-brandgray-900/80 h-48 rounded shadow-lg shadow-black/50 overflow-hidden hover:brightness-125 hover:scale-105 transition-all duration-300 ease-in-out">
        <div className="flex-none flex-row p-4 max-w-[40%]">
          <div className="flex flex-col">
            <h4 className="text-lg font-bold">{title}</h4>
            <p className="text-sm">{description}</p>
          </div>
        </div>
        <img
          className="flex-1 object-cover w-full h-full"
          src={landscape}
          alt="img"
        />
      </div>
    </Link>
  );
};

export default CategoryCard;
