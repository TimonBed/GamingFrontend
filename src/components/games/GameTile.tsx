import React from "react";

interface GameCoverTileProps {
  game: {
    id: number;
    name: string;
    game_category: string;
    release_date: string;
    image: string;
  };
}

const GameCoverTile: React.FC<GameCoverTileProps> = ({ game }) => {
  const { name, game_category, image } = game;

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105">
      <div className="relative aspect-w-16 aspect-h-9 mb-4">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover rounded-md"
        />
        <div className="absolute inset-0 bg-black opacity-40 rounded-md"></div>
      </div>
      <div className="text-brandtext">
        <h3 className="text-lg font-semibold mb-2">{name}</h3>
        <p className="text-sm text-gray-400 mb-2">{game_category}</p>
        {/* Add additional information or customization based on your needs */}
      </div>
    </div>
  );
};

export default GameCoverTile;
