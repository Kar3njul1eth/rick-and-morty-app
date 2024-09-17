import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { fetchLocations } from '../api/rickAndMortyApi';
import Pagination from '../components/Pagination/Pagination';

interface Location {
  id: number;
  name: string;
  type: string;
  dimension: string;
}

const Location: React.FC = () => {
  const [page, setPage] = useState(1);

  const { data, isLoading, error } = useQuery(
    ['locations', page],
    () => fetchLocations(page),
    { keepPreviousData: true }
  );

  if (isLoading) return <div className="text-center mt-8">Loading...</div>;
  if (error) return <div className="text-center mt-8 text-red-500">An error has occurred</div>;

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-4xl font-bold text-center my-8">Locations</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data?.results.map((location: Location) => (
          <div key={location.id} className="bg-white shadow-md rounded-lg p-4">
            <h2 className="text-xl font-bold mb-2">{location.name}</h2>
            <p className="text-gray-600">Type: {location.type}</p>
            <p className="text-gray-600">Dimension: {location.dimension}</p>
          </div>
        ))}
      </div>
      <Pagination
        currentPage={page}
        totalPages={data?.info.pages || 1}
        onPageChange={setPage}
      />
    </div>
  );
};

export default Location;