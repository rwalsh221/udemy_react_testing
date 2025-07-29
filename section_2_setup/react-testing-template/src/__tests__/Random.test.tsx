import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Random from '../Random';

describe('Random component', () => {
  test('renders correctly', () => {
    render(<Random />);
    screen.debug();
    const element = screen.getByText(/random/i);
    expect(element).toBeInTheDocument();
  });
});
