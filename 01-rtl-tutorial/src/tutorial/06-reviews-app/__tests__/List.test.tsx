import { render, screen } from '@testing-library/react';
import List from '../List';
import { type Review } from '../Sandbox';

const mockReviews: Review[] = [
  { email: 'test@test.com', rating: '4', text: 'blah blah blah' },
  { email: 'test2@test2.com', rating: '2', text: 'blah blah 2222' },
];

describe('List Component', () => {
  test('renders heading', () => {
    render(<List reviews={[]} />);
    expect(
      screen.getByRole('heading', { level: 2, name: /reviews/i })
    ).toBeInTheDocument();
  });

  test('displays "no reviews yet" when reviews array is empty', () => {
    render(<List reviews={[]} />);
    expect(screen.getByText(/no reviews yet/i)).toBeInTheDocument();
  });

  test('renders reviews correctly when provided', () => {
    render(<List reviews={mockReviews} />);
    mockReviews.forEach((review) => {
      expect(screen.getByText(review.email)).toBeInTheDocument();
      expect(screen.getByText(review.text)).toBeInTheDocument();
      const stars = '⭐'.repeat(Number(review.rating));
      expect(screen.getByText(stars)).toBeInTheDocument();
    });
  });
});
