import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Search from './Search';

vi.mock('../../hooks/useDebounce', () => ({
  default: vi.fn((value) => value),
}));

describe('Search Component', () => {
  it('calls onSearch with input value after debounce', async () => {
    const mockOnSearch = vi.fn();
    render(<Search onSearch={mockOnSearch} />);

    const input = screen.getByPlaceholderText('Search characters');
    fireEvent.change(input, { target: { value: 'Rick' } });

    await waitFor(() => {
      expect(mockOnSearch).toHaveBeenCalledWith('Rick');
    });
  });

  it('updates input value when typing', () => {
    const mockOnSearch = vi.fn();
    render(<Search onSearch={mockOnSearch} />);

    const input = screen.getByPlaceholderText('Search characters') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'Rick' } });

    expect(input.value).toBe('Rick');
  });
});