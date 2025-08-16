import { render, screen } from '@testing-library/react';
import UserCard from '../components/user/UserCard';

describe('UserCard', () => {
  const mockProps = {
    avatarUrl: 'avatar.com',
    name: 'John Doe',
    bio: 'dev bio',
    url: 'github.com/johndoe',
  };

  test('renders user information correctly', () => {
    render(<UserCard {...mockProps} />);
    expect(screen.getByText(/john doe/i)).toBeInTheDocument();
    expect(screen.getByText(/dev bio/i)).toBeInTheDocument();

    const avatarImg = screen.getByAltText(/john doe/i);
    expect(avatarImg).toBeInTheDocument();
    expect(avatarImg).toHaveAttribute('src', 'avatar.com');

    const followLink = screen.getByRole('link', { name: /follow/i });
    expect(followLink).toHaveAttribute('href', 'github.com/johndoe');
    expect(followLink).toHaveAttribute('target', '_blank');
    expect(followLink).toHaveAttribute('rel', 'noreferrer');
  });

  test('renders default values whn name and bio not provided', () => {
    const propsWithoutNameAndBio = { ...mockProps, name: '', bio: '' };

    render(<UserCard {...propsWithoutNameAndBio} />);
    expect(screen.getByText(/no bio/i)).toBeInTheDocument();
    expect(screen.getByText(/no name/i)).toBeInTheDocument();
  });
});
