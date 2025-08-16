import { render, screen } from '@testing-library/react';
import StatsContainer from '../components/user/StatsContainer';

describe('statsContainer', () => {
  test('renders all stats with correct valves', () => {
    const props = {
      totalRepos: 25,
      followers: 100,
      following: 50,
      gists: 10,
    };
    render(<StatsContainer {...props} />);

    expect(screen.getByText(/total repositories/i)).toBeInTheDocument();
    expect(screen.getByText(/25/i)).toBeInTheDocument();

    expect(screen.getByText(/followers/i)).toBeInTheDocument();
    expect(screen.getByText(/100/i)).toBeInTheDocument();

    expect(screen.getByText(/following/i)).toBeInTheDocument();
    expect(screen.getByText(/50/i)).toBeInTheDocument();

    expect(screen.getByText(/gists/i)).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
  });
});
