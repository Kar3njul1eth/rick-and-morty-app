import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import Card from '../Card/Card';

const mockCharacter = {
  image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
  name: 'Rick Sanchez',
  status: 'Alive',
  species: 'Human',
  gender: 'Male',
  origin: { name: 'Earth' }
};

describe('Card Component', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('renders character information correctly', () => {
    render(<Card {...mockCharacter} />);

    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    expect(screen.getByText('Alive')).toBeInTheDocument();
    expect(screen.getByText('Species: Human')).toBeInTheDocument();
    expect(screen.getByText('Gender: Male')).toBeInTheDocument();
    expect(screen.getByText('Origin: Earth')).toBeInTheDocument();
    expect(screen.getByAltText('Rick Sanchez')).toHaveAttribute('src', mockCharacter.image);
  });

  it('applies correct classes based on isModal prop', () => {
    const { rerender } = render(<Card {...mockCharacter} />);
    expect(screen.getByRole('img')).toHaveClass('h-48');

    rerender(<Card {...mockCharacter} isModal={true} />);
    expect(screen.getByRole('img')).toHaveClass('h-64');
  });
});