import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import Home from '../pages/Home';
import { fetchCharacters } from '../api/rickAndMortyApi';

vi.mock('../api/rickAndMortyApi');

describe('Home Component', () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });
    vi.resetAllMocks();
  });

  const renderWithQueryClient = (component: React.ReactElement) => {
    return render(
      <QueryClientProvider client={queryClient}>
        {component}
      </QueryClientProvider>
    );
  };

  it('renders loading state initially', async () => {
    vi.mocked(fetchCharacters).mockImplementation(() => new Promise(() => {}));

    renderWithQueryClient(<Home />);

    await waitFor(() => {
      expect(screen.getByText('Loading...')).toBeInTheDocument();
    });
  });

  it('renders characters when data is loaded', async () => {
    vi.mocked(fetchCharacters).mockResolvedValue({
      results: [
        { id: 1, name: 'Rick Sanchez', status: 'Alive', species: 'Human', gender: 'Male', origin: { name: 'Earth' }, image: 'rick.jpg' }
      ],
      info: { pages: 1 }
    });

    renderWithQueryClient(<Home />);

    await waitFor(() => {
      expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    });
  });

  it('renders no results message when no characters are found', async () => {
    vi.mocked(fetchCharacters).mockResolvedValue({
      results: [],
      info: { pages: 0 }
    });

    renderWithQueryClient(<Home />);

    await waitFor(() => {
      expect(screen.getByText('No characters found matching your search')).toBeInTheDocument();
    });
  });

});