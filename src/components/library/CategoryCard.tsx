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
    <Link to={link} className="text-brandtext">
      <div className="relative h-72 w-48 rounded-md overflow-hidden hover:brightness-125 hover:scale-105 transition-all duration-300 ease-in-out">
        <img
          className=" object-cover w-full h-full drop-shadow"
          src={landscape}
          alt="img"
        />

        {/* Overlay text */}
        <div className="absolute inset-0 flex items-center justify-end m-4 mb-10 flex-col space-y-2">
          <h4 className="text-lg font-bold">{title}</h4>
          <p className="text-sm min-h-10">{description}</p>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;
