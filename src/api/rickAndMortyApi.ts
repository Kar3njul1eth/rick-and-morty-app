import axios from 'axios';

const BASE_URL = 'https://rickandmortyapi.com/api';

export const fetchCharacters = async (
  page: number,
  name: string = '',
  status: string = '',
  gender: string = '',
  species: string = ''
) => {
  const response = await axios.get(`${BASE_URL}/character`, {
    params: { page, name, status, gender, species }
  });
  return response.data;
};

export const fetchEpisodes = async (page: number) => {
  const response = await axios.get(`${BASE_URL}/episode`, {
    params: { page }
  });
  return response.data;
};

export const fetchLocations = async (page: number) => {
  const response = await axios.get(`${BASE_URL}/location`, {
    params: { page }
  });
  return response.data;
};
