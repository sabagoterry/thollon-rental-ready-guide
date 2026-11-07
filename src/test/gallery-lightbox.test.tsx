import { act, cleanup, fireEvent, render } from '@testing-library/react';
import { afterEach, expect, it, vi } from 'vitest';
import { GalleryLightbox } from '@/components/gallery-lightbox';

afterEach(() => { cleanup(); vi.useRealTimers(); });
it('starts at the clicked photo, advances every four seconds and loops', () => {
  vi.useFakeTimers();
  const photos = [{ src: '/a.jpg', alt: 'First', altFr: 'Premier' }, { src: '/b.jpg', alt: 'Second', altFr: 'Deuxième' }];
  const view = render(<GalleryLightbox photos={photos} startIndex={1} onClose={() => {}} />);
  expect(view.getByRole('img').getAttribute('src')).toBe('/b.jpg');
  act(() => vi.advanceTimersByTime(3999));
  expect(view.getByRole('img').getAttribute('src')).toBe('/b.jpg');
  act(() => vi.advanceTimersByTime(1));
  expect(view.getByRole('img').getAttribute('src')).toBe('/a.jpg');
  fireEvent.click(view.getByRole('button', { name: 'Pause gallery' }));
  act(() => vi.advanceTimersByTime(8000));
  expect(view.getByRole('img').getAttribute('src')).toBe('/a.jpg');
  fireEvent.click(view.getByRole('button', { name: 'Next gallery photo' }));
  expect(view.getByRole('img').getAttribute('src')).toBe('/b.jpg');
});