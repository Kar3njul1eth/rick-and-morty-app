import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, within } from '@testing-library/react';
import Filter from './Filter';

describe('Filter Component', () => {
  it('calls onFilterChange with correct values when selecting filters', () => {
    const mockOnFilterChange = vi.fn();
    render(<Filter onFilterChange={mockOnFilterChange} />);

    const statusSelect = screen.getByLabelText('Status');
    fireEvent.change(statusSelect, { target: { value: 'Alive' } });

    expect(mockOnFilterChange).toHaveBeenCalledWith({
      status: 'Alive',
      gender: '',
      species: ''
    });

    const genderSelect = screen.getByLabelText('Gender');
    fireEvent.change(genderSelect, { target: { value: 'Female' } });

    expect(mockOnFilterChange).toHaveBeenCalledWith({
      status: 'Alive',
      gender: 'Female',
      species: ''
    });

    const speciesSelect = screen.getByLabelText('Species');
    fireEvent.change(speciesSelect, { target: { value: 'Human' } });

    expect(mockOnFilterChange).toHaveBeenCalledWith({
      status: 'Alive',
      gender: 'Female',
      species: 'Human'
    });
  });

  it('renders all filter options correctly', () => {
    render(<Filter onFilterChange={() => {}} />);

    const statusSelect = screen.getByLabelText('Status');
    const genderSelect = screen.getByLabelText('Gender');
    const speciesSelect = screen.getByLabelText('Species');

    const statusOptions = ['All', 'Alive', 'Dead', 'Unknown'];
    statusOptions.forEach(option => {
      expect(within(statusSelect).getByRole('option', { name: option })).toBeInTheDocument();
    });

    const genderOptions = ['All', 'Female', 'Male', 'Genderless', 'Unknown'];
    genderOptions.forEach(option => {
      expect(within(genderSelect).getByRole('option', { name: option })).toBeInTheDocument();
    });

    const speciesOptions = ['All', 'Human', 'Alien', 'Humanoid', 'Poopybutthole', 'Mythological', 'Unknown', 'Animal', 'Disease', 'Robot', 'Cronenberg', 'Planet'];
    speciesOptions.forEach(option => {
      expect(within(speciesSelect).getByRole('option', { name: option })).toBeInTheDocument();
    });
  });
});