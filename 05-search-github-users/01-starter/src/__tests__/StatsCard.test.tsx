import { render, screen } from '@testing-library/react';
import StatsCard from '../components/user/StatsCard';

describe('StatsCard', () => {
  test('renders title and count correctly', () => {
    render(<StatsCard title="total users" count={42} />);
    expect(screen.getByText(/total users/i)).toBeInTheDocument();
    expect(screen.getByText(/42/i)).toBeInTheDocument();
  });

  test('renders with zero count', () => {
    render(<StatsCard title="total users" count={0} />);

    expect(screen.getByText(/0/i)).toBeInTheDocument();
  });

  test('renders with large number', () => {
    render(<StatsCard title="total users" count={10000000000} />);

    expect(screen.getByText(/10000000000/i)).toBeInTheDocument();
  });
});
