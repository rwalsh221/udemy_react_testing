import { getAllByText, render, screen } from '@testing-library/react';
import Sandbox from './Sandbox';

describe('01-search-by-text', () => {
  test('demonstate different query methods', async () => {
    render(<Sandbox />);
    screen.debug();

    // 1, getByText
    const heading = screen.getByText('React testing library examples');
    expect(heading).toBeInTheDocument();
    // regex for above test
    expect(screen.getByText(/react/i)).toBeInTheDocument();

    const phoneRegex = /\d{3}-\d{3}-\d{4}/;
    const phoneText = screen.getByText(phoneRegex);
    expect(phoneText).toBeInTheDocument();

    // getbyText will fail on var init if not in document
    const errorMessage = screen.queryByText('Error message');
    expect(errorMessage).not.toBeInTheDocument();

    // fails as multiple elements with same text
    // const items = screen.getByText('item 1');
    const items = screen.getAllByText('item 1');
    expect(items).toHaveLength(4);

    const asyncMessage = await screen.findByText('Async message');
    expect(asyncMessage).toBeInTheDocument();
  });
});
