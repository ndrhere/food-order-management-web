import { render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import App from './App.jsx';

vi.mock('./api.js', () => ({
  fetchMenu: vi.fn().mockResolvedValue([
    {
      _id: '1',
      name: 'Margherita Pizza',
      description: 'Classic pizza',
      price: 299,
      image: 'pizza.jpg',
      category: 'Pizza',
    },
  ]),
  createOrder: vi.fn(),
  SOCKET_URL: 'http://localhost:5000',
}));

vi.mock('socket.io-client', () => ({
  io: () => ({ emit: vi.fn(), on: vi.fn(), disconnect: vi.fn() }),
}));

describe('App', () => {
  it('loads the menu', async () => {
    render(<App />);
    await waitFor(() => {
      expect(screen.getByText('Margherita Pizza')).toBeInTheDocument();
    });
  });
});
