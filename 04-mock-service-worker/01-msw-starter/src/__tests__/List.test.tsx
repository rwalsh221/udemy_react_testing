import { render, screen } from '@testing-library/react';
import userEvent, { type UserEvent } from '@testing-library/user-event';
import List from '../components/List';
import { type Post } from '../hooks/usePosts';

const mockPosts: Post[] = [
  { id: '1', title: 'post1', likes: 0 },
  { id: '2', title: 'post2', likes: 2 },
];

const mockOnLike = vi.fn();
const mockOnDelete = vi.fn();

describe('List Component', () => {
  test('renders correct number of articles', () => {
    render(
      <List posts={mockPosts} onDelete={mockOnDelete} onLike={mockOnLike} />
    );
    expect(screen.getAllByRole('article')).toHaveLength(2);
  });

  test('renders empty list when no posts provided', () => {
    render(<List posts={[]} onDelete={mockOnDelete} onLike={mockOnLike} />);
    expect(screen.queryAllByRole('article')).toHaveLength(0);
  });
});
