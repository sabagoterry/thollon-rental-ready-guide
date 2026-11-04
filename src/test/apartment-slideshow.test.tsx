import { act, cleanup, fireEvent, render } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { ApartmentSlideshow } from '@/components/apartment-slideshow';

afterEach(() => { cleanup(); vi.useRealTimers(); });

describe('Apartment slideshow', () => {
  it('changes photo after exactly six seconds', () => {
    vi.useFakeTimers();
    const view = render(<ApartmentSlideshow />);
    const first = view.getByAltText('Living and dining room');
    act(() => vi.advanceTimersByTime(5999));
    expect(first.getAttribute('aria-hidden')).toBe('false');
    act(() => vi.advanceTimersByTime(1));
    expect(first.getAttribute('aria-hidden')).toBe('true');
    expect(view.getByAltText('Armchairs and dresser').getAttribute('aria-hidden')).toBe('false');
  });

  it('arrows change immediately, wrap, and give the new photo six seconds', () => {
    vi.useFakeTimers();
    const view = render(<ApartmentSlideshow />);
    act(() => vi.advanceTimersByTime(5000));
    fireEvent.click(view.getByRole('button', { name: 'Previous photo' }));
    expect(view.getByAltText('Bathroom').getAttribute('aria-hidden')).toBe('false');
    act(() => vi.advanceTimersByTime(5999));
    expect(view.getByAltText('Bathroom').getAttribute('aria-hidden')).toBe('false');
    fireEvent.click(view.getByRole('button', { name: 'Next photo' }));
    expect(view.getByAltText('Living and dining room').getAttribute('aria-hidden')).toBe('false');
  });

  it('stops advancing while paused and resumes on request', () => {
    vi.useFakeTimers();
    const view = render(<ApartmentSlideshow />);
    fireEvent.click(view.getByRole('button', { name: 'Pause slideshow' }));
    act(() => vi.advanceTimersByTime(12000));
    expect(view.getByAltText('Living and dining room').getAttribute('aria-hidden')).toBe('false');
    fireEvent.click(view.getByRole('button', { name: 'Resume slideshow' }));
    act(() => vi.advanceTimersByTime(6000));
    expect(view.getByAltText('Armchairs and dresser').getAttribute('aria-hidden')).toBe('false');
  });
});