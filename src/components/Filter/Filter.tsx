import React, { useState, useCallback } from 'react';

interface FilterProps {
  onFilterChange: (filters: { status: string; gender: string; species: string }) => void;
}

const Filter: React.FC<FilterProps> = ({ onFilterChange }) => {
  const [status, setStatus] = useState('');
  const [gender, setGender] = useState('');
  const [species, setSpecies] = useState('');

  const statuses = ['Alive', 'Dead', 'Unknown'];
  const genders = ['Female', 'Male', 'Genderless', 'Unknown'];
  const speciesList = ['Human', 'Alien', 'Humanoid', 'Poopybutthole', 'Mythological', 'Unknown', 'Animal', 'Disease', 'Robot', 'Cronenberg', 'Planet'];

  const handleFilter = useCallback((
    setter: React.Dispatch<React.SetStateAction<string>>,
    value: string,
    filterType: 'status' | 'gender' | 'species'
  ) => {
    setter(value);
    onFilterChange({
      status: filterType === 'status' ? value : status,
      gender: filterType === 'gender' ? value : gender,
      species: filterType === 'species' ? value : species,
    });
  }, [status, gender, species, onFilterChange]);

  const clearFilters = () => {
    setStatus('');
    setGender('');
    setSpecies('');
    onFilterChange({ status: '', gender: '', species: '' });
  };

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4">Filters</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
        <label htmlFor="status-select" className="font-semibold mb-2 block">Status</label>
        <select
            className="w-full p-2 border rounded border-blue-950"
            value={status}
            aria-label="Status"
            onChange={(e) => handleFilter(setStatus, e.target.value, 'status')}
          >
            <option value="">All</option>
            {statuses.map((statusOption) => (
              <option key={statusOption} value={statusOption}>{statusOption}</option>
            ))}
          </select>
        </div>
        <div>
        <label htmlFor="gender-select" className="font-semibold mb-2 block">Gender</label>
        <select
            className="w-full p-2 border border-blue-950 rounded"
            value={gender}
            aria-label="Gender"
            onChange={(e) => handleFilter(setGender, e.target.value, 'gender')}
          >
            <option value="">All</option>
            {genders.map((genderOption) => (
              <option key={genderOption} value={genderOption}>{genderOption}</option>
            ))}
          </select>
        </div>
        <div>
        <label htmlFor="species-select" className="font-semibold mb-2 block">Species</label>
        <select
            className="w-full p-2 border border-blue-950 rounded"
            aria-label="Species"
            value={species}
            onChange={(e) => handleFilter(setSpecies, e.target.value, 'species')}
          >
            <option value="">All</option>
            {speciesList.map((speciesOption) => (
              <option key={speciesOption} value={speciesOption}>{speciesOption}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="mt-4">
        <button
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
          onClick={clearFilters}
        >
          Clean filters
        </button>
      </div>
    </div>
  );
};

export default Filter;