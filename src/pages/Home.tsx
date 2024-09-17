import React, { useState, useCallback } from 'react';
import { useQuery } from 'react-query';
import { fetchCharacters } from '../api/rickAndMortyApi';
import Card from '../components/Card/Card';
import Search from '../components/Search/Search';
import Pagination from '../components/Pagination/Pagination';
import Filter from '../components/Filter/Filter';
import Modal from '../components/Modal/Modal';


interface ApiError extends Error {
  response?: {
    status: number;
  };
}

interface Character {
  id: number;
  image: string;
  name: string;
  status: string;
  species: string;
  gender: string;
  origin: {
    name: string;
  };
}

const Home: React.FC = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({ status: '', gender: '', species: '' });
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);


  const { data, isLoading, error } = useQuery<{ results: Character[], info: { pages: number } }, ApiError>(
    ['characters', page, search, filters],
    () => fetchCharacters(page, search, filters.status, filters.gender, filters.species),
    {
      keepPreviousData: true,
      retry: (_failureCount, error) => error.response?.status !== 404
    }
  );

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleSearch = useCallback((value: string) => {
    setSearch(value);
    setPage(1);
  }, []);

  const handleFilterChange = useCallback((newFilters: typeof filters) => {
    setFilters(newFilters);
    setPage(1);
  }, []);

  const handleCardClick = (character: Character) => {
    setSelectedCharacter(character);
  };

  const handleCloseModal = () => {
    setSelectedCharacter(null);
  };

  const noResults = (!isLoading && !error && (!data?.results || data.results.length === 0)) ||
                    (error && error.response?.status === 404);

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-4xl font-bold text-center my-8">Characters</h1>
      <Search onSearch={handleSearch} />
      <Filter onFilterChange={handleFilterChange} />
      {isLoading ? (
        <div className="text-center mt-8">Loading...</div>
      ) : noResults ? (
        <div className="text-center mt-16 space-y-4">
          <p className="text-xl text-gray-600">
          No characters found matching your search
          </p>
          <p className="text-lg text-blue-600">
            Try adjusting your filters or search term.
          </p>
        </div>
      ) : error ? (
        <div className="text-center mt-8 text-red-500">An error has occurred</div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
            {data?.results.map((character) => (
              <Card
                key={character.id}
                image={character.image}
                name={character.name}
                status={character.status}
                species={character.species}
                gender={character.gender}
                origin={character.origin}
                onClick={() => handleCardClick(character)}
              />
            ))}
          </div>
          <Pagination
            currentPage={page}
            totalPages={data?.info.pages || 1}
            onPageChange={handlePageChange}
          />
        </>
      )}
      <Modal isOpen={!!selectedCharacter} onClose={handleCloseModal}>
        {selectedCharacter && (
          <Card
            image={selectedCharacter.image}
            name={selectedCharacter.name}
            status={selectedCharacter.status}
            species={selectedCharacter.species}
            gender={selectedCharacter.gender}
            origin={selectedCharacter.origin}
            isModal={true}
          />
        )}
      </Modal>
    </div>
  );
};

export default Home;