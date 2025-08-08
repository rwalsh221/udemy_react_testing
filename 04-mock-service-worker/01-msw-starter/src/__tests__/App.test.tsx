import { render, screen, within } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';
// import { getFormElements } from './Form.test';
import { posts } from '../mocks/handlers';
import server from '../mocks/server';
import {
  getErrorHandler,
  createErrorHandler,
  updateErrorHandler,
  deleteErrorHandler,
} from '../mocks/handlers';

const getFormElements = () => ({
  input: screen.getByRole('textbox', { name: /title/i }),
  submitBtn: screen.getByRole('button', { name: /add post/i }),
});

describe('App Component', () => {
  test('renders the App component', () => {
    render(<App />);
    expect(screen.getByText(/posts manager/i));
  });

  test('fetches posts on mount', async () => {
    render(<App />);
    expect(await screen.findByText(/first post/i)).toBeInTheDocument();
    expect(await screen.findByText(/second post/i)).toBeInTheDocument();
  });

  test('create a new post', async () => {
    const user = userEvent.setup();
    render(<App />);
    const { input, submitBtn } = getFormElements();

    await user.type(input, 'new post');
    await user.click(submitBtn);
    expect(await screen.findByText(/new post/i)).toBeInTheDocument();
  });
  test('updates post', async () => {
    const user = userEvent.setup();
    render(<App />);

    const likeButton = await screen.findByRole('button', {
      name: `👍 ${posts[0].likes}`,
    });

    await user.click(likeButton);
    expect(
      await screen.findByRole('button', {
        name: `👍 ${posts[0].likes}`,
      })
    ).toBeInTheDocument();
  });

  test('deletes post', async () => {
    const user = userEvent.setup();
    render(<App />);
    const initialPost = await screen.findAllByRole('article');
    expect(initialPost).toHaveLength(3);

    const lastPost = initialPost[2];
    const deleteBtn = within(lastPost).getByRole('button', {
      name: /delete/i,
    });

    await user.click(deleteBtn);
    const postAfterDelete = await screen.getAllByRole('article');
    expect(postAfterDelete).toHaveLength(2);
  });

  test('shows error msg when fetching posts fails', async () => {
    // OVERRIDES HANDLERS PASSED TO SERVER() IN SETUPSERVER() IN MOCKS/SERVER.TS
    server.use(...getErrorHandler);
    render(<App />);

    expect(
      await screen.findByText(/failed to fetch posts/i)
    ).toBeInTheDocument();
  });

  test('shows error msg when creating posts fails', async () => {
    // OVERRIDES HANDLERS PASSED TO SERVER() IN SETUPSERVER() IN MOCKS/SERVER.TS
    const user = userEvent.setup();
    server.use(...createErrorHandler);
    render(<App />);

    const { input, submitBtn } = getFormElements();
    await user.type(input, 'new post');
    await user.click(submitBtn);

    expect(
      await screen.findByText(/failed to create post/i)
    ).toBeInTheDocument();
  });

  test('shows error msg when updating post fails', async () => {
    // OVERRIDES HANDLERS PASSED TO SERVER() IN SETUPSERVER() IN MOCKS/SERVER.TS
    const user = userEvent.setup();
    server.use(...updateErrorHandler);
    render(<App />);

    const likeButton = await screen.findByRole('button', {
      name: `👍 ${posts[0].likes}`,
    });

    await user.click(likeButton);

    expect(await screen.findByText(/failed to like post/i)).toBeInTheDocument();
  });

  test('shows error msg when deleting post fails', async () => {
    // OVERRIDES HANDLERS PASSED TO SERVER() IN SETUPSERVER() IN MOCKS/SERVER.TS
    const user = userEvent.setup();
    server.use(...deleteErrorHandler);
    render(<App />);

    const allPosts = await screen.findAllByRole('article');

    const firstPost = allPosts[0];
    const deleteBtn = within(firstPost).getByRole('button', {
      name: /delete/i,
    });

    await user.click(deleteBtn);

    expect(
      await screen.findByText(/failed to delete post/i)
    ).toBeInTheDocument();
  });
});
