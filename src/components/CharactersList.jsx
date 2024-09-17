import { useQuery } from "react-query"
const CharactersList = () => {
  const getCharacters = async () => {
    const response = await fetch('https://rickandmortyapi.com/api/character')
    return response.json();
  }
  const { data, status } = useQuery('characters', getCharacters)

  if(status === 'loading') {
    return <p>Characters List...</p>
  }

  if(status === 'error') {
    return <p>Error</p>
  }


  return <div>
    <h2>Characters List </h2>
  </div>
}

export default CharactersList;