import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { fetchEpisodes } from '../api/rickAndMortyApi';
import Pagination from '../components/Pagination/Pagination';

interface Episode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
}

const Episodes: React.FC = () => {
  const [page, setPage] = useState(1);

  const { data, isLoading, error } = useQuery(
    ['episodes', page],
    () => fetchEpisodes(page),
    { keepPreviousData: true }
  );

  if (isLoading) return <div className="text-center mt-8">Loading...</div>;
  if (error) return <div className="text-center mt-8 text-red-500">An error has occurred</div>;

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-4xl font-bold text-center my-8">Episodes</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data?.results.map((episode: Episode) => (
          <div key={episode.id} className="bg-white shadow-md rounded-lg p-4">
            <h2 className="text-xl font-bold mb-2">{episode.name}</h2>
            <p className="text-gray-600">{episode.episode}</p>
            <p className="text-gray-600">Air Date: {episode.air_date}</p>
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

export default Episodes;