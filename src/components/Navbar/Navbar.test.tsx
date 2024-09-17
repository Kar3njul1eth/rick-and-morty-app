import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Navbar from './Navbar';

describe('Navbar Component', () => {
  it('renders the brand name', () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );
    expect(screen.getByText('Rick & Morty')).toBeInTheDocument();
  });

  it('renders navigation links', () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );
    expect(screen.getByText('Characters')).toBeInTheDocument();
    expect(screen.getByText('Episodes')).toBeInTheDocument();
    expect(screen.getByText('Locations')).toBeInTheDocument();
  });

  it('links have correct href attributes', () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );
    expect(screen.getByText('Characters').closest('a')).toHaveAttribute('href', '/');
    expect(screen.getByText('Episodes').closest('a')).toHaveAttribute('href', '/episodes');
    expect(screen.getByText('Locations').closest('a')).toHaveAttribute('href', '/location');
  });
});