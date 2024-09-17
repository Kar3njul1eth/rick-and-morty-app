import React, { useState, useEffect } from 'react';
import useDebounce from '../../hooks/useDebounce';

interface SearchProps {
  onSearch: (search: string) => void;
}

const Search: React.FC<SearchProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  useEffect(() => {
    onSearch(debouncedSearchTerm);
  }, [debouncedSearchTerm, onSearch]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <input
      type="text"
      value={searchTerm}
      placeholder="Search characters"
      onChange={handleSearch}
      className="mb-8 px-4 py-2 border border-solid border-blue-950 rounded-lg"
    />
  );
};

export default Search;