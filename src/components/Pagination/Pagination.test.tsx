import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from './Pagination';

vi.mock('@heroicons/react/20/solid', () => ({
  ChevronLeftIcon: () => <span>Previous</span>,
  ChevronRightIcon: () => <span>Next</span>,
}));

describe('Pagination Component', () => {
  const mockOnPageChange = vi.fn();

  it('renders the correct page numbers', () => {
    render(<Pagination currentPage={3} totalPages={5} onPageChange={mockOnPageChange} />);
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('highlights the current page', () => {
    render(<Pagination currentPage={3} totalPages={5} onPageChange={mockOnPageChange} />);
    expect(screen.getByText('3')).toHaveClass('bg-blue-950');
  });

  it('calls onPageChange when a page number is clicked', () => {
    render(<Pagination currentPage={3} totalPages={5} onPageChange={mockOnPageChange} />);
    fireEvent.click(screen.getByText('4'));
    expect(mockOnPageChange).toHaveBeenCalledWith(4);
  });
});