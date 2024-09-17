import { describe, it, expect, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import useDebounce from './useDebounce';

describe('useDebounce', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should return the initial value immediately', () => {
    const { result } = renderHook(() => useDebounce('initial value', 500));
    expect(result.current).toBe('initial value');
  });

  it('should debounce the value change', async () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: 'initial value', delay: 500 } }
    );

    rerender({ value: 'new value', delay: 500 });
    expect(result.current).toBe('initial value');

    act(() => {
      vi.advanceTimersByTime(250);
    });
    expect(result.current).toBe('initial value');

    act(() => {
      vi.advanceTimersByTime(250);
    });
    expect(result.current).toBe('new value');
  });

  it('should cancel the previous debounce when value changes rapidly', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: 'initial value', delay: 500 } }
    );

    rerender({ value: 'intermediate value', delay: 500 });
    rerender({ value: 'final value', delay: 500 });

    act(() => {
      vi.advanceTimersByTime(250);
    });
    expect(result.current).toBe('initial value');

    act(() => {
      vi.advanceTimersByTime(250);
    });
    expect(result.current).toBe('final value');
  });

  it('should handle delay change', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: 'initial value', delay: 500 } }
    );

    rerender({ value: 'new value', delay: 1000 });

    act(() => {
      vi.advanceTimersByTime(500);
    });
    expect(result.current).toBe('initial value');

    act(() => {
      vi.advanceTimersByTime(500);
    });
    expect(result.current).toBe('new value');
  });
});