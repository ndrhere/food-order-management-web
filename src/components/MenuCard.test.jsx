import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import MenuCard from './MenuCard.jsx';

describe('MenuCard', () => {
  it('renders item details and handles add click', async () => {
    const onAdd = vi.fn();
    render(
      <MenuCard
        onAdd={onAdd}
        item={{
          _id: '1',
          name: 'Margherita Pizza',
          description: 'Classic pizza',
          price: 299,
          image: 'pizza.jpg',
          category: 'Pizza',
        }}
      />
    );

    expect(screen.getByText('Margherita Pizza')).toBeInTheDocument();
    expect(screen.getByText('Classic pizza')).toBeInTheDocument();
    screen.getByRole('button', { name: /add margherita pizza/i }).click();
    expect(onAdd).toHaveBeenCalledTimes(1);
  });
});
