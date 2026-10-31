import { act, fireEvent, render, cleanup } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { BackgroundMusic } from '@/components/background-music';

afterEach(() => { cleanup(); vi.unstubAllGlobals(); });

function mockAudio() {
  const audio = new EventTarget() as EventTarget & {
    loop: boolean; volume: number; preload: string; paused: boolean;
    play: ReturnType<typeof vi.fn>; pause: ReturnType<typeof vi.fn>;
  };
  Object.assign(audio, { loop: false, volume: 1, preload: '', paused: true });
  audio.play = vi.fn(async () => { audio.paused = false; audio.dispatchEvent(new Event('play')); });
  audio.pause = vi.fn(() => { audio.paused = true; audio.dispatchEvent(new Event('pause')); });
  const constructor = vi.fn(function () { return audio; });
  vi.stubGlobal('Audio', constructor);
  return { audio, constructor };
}

describe('Continuous background music', () => {
  it('loops and keeps the same playing audio across parent rerenders', async () => {
    const { audio, constructor } = mockAudio();
    const view = render(<BackgroundMusic />);
    await act(async () => { fireEvent.click(view.getByRole('button')); });
    expect(audio.loop).toBe(true);
    expect(audio.paused).toBe(false);
    view.rerender(<BackgroundMusic />);
    expect(constructor).toHaveBeenCalledTimes(1);
    expect(audio.pause).not.toHaveBeenCalled();
  });

  it('does not restart visitor-paused music on another page interaction', async () => {
    const { audio } = mockAudio();
    const view = render(<BackgroundMusic />);
    await act(async () => { fireEvent.click(view.getByRole('button')); });
    fireEvent.click(view.getByRole('button'));
    await act(async () => { fireEvent.pointerDown(window); });
    expect(audio.paused).toBe(true);
    expect(audio.play).toHaveBeenCalledTimes(1);
  });
  it('never starts on unrelated pointer or keyboard interactions', () => {
    const { audio } = mockAudio();
    render(<BackgroundMusic />);
    fireEvent.pointerDown(window);
    fireEvent.keyDown(window, { key: 'Enter' });
    expect(audio.play).not.toHaveBeenCalled();
    expect(audio.paused).toBe(true);
  });
  it('resumes only when requested after pausing', async () => {
    const { audio } = mockAudio();
    const view = render(<BackgroundMusic />);
    await act(async () => { fireEvent.click(view.getByRole('button')); });
    fireEvent.click(view.getByRole('button'));
    await act(async () => { fireEvent.click(view.getByRole('button')); });
    expect(audio.play).toHaveBeenCalledTimes(2);
    expect(audio.paused).toBe(false);
    expect(audio.loop).toBe(true);
  });
});