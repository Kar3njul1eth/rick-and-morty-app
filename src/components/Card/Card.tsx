import React from 'react';

interface CardProps {
  image: string;
  name: string;
  status: string;
  species: string;
  gender: string;
  origin: {
    name: string;
  };
  onClick?: () => void;
  isModal?: boolean;
}

const Card: React.FC<CardProps> = ({ image, name, status, species, gender, origin, onClick, isModal }) => {
  const cardClasses = isModal
    ? "bg-white rounded-lg overflow-hidden"
    : "bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-transform hover:scale-105";

  const imageClasses = isModal
    ? "w-full h-64 object-cover"
    : "w-full h-48 object-cover";

  return (
    <div
      className={cardClasses}
      onClick={onClick}
    >
      <img className={imageClasses} src={image} alt={name} />
      <div className="p-4">
        <h2 className="font-bold text-xl mb-2">{name}</h2>
        <p className="text-gray-700 mb-1">
          <span className={`inline-block px-2 py-1 rounded-full text-sm font-semibold mr-2 ${
            status === 'Alive' ? 'bg-green-200 text-green-800' :
            status === 'Dead' ? 'bg-red-200 text-red-800' :
            'bg-gray-200 text-gray-800'
          }`}>
            {status}
          </span>
        </p>
        <p className="text-gray-600 mb-1">Species: {species}</p>
        <p className="text-gray-600 mb-1">Gender: {gender}</p>
        <p className="text-gray-600">Origin: {origin.name}</p>
      </div>
    </div>
  );
};

export default Card;