import { render, screen } from '@testing-library/react';
import UserProfile from '../components/user/UserProfile';
import client from '../apolloClient';
import { ApolloProvider } from '@apollo/client';

// VI.MOCK() REPLACES IMPORTED COMPONENT WITH DEFAULT FOR TESTING

vi.mock('@/components/charts/UsedLanguages', () => ({
  default: () => <div>Used Languages</div>,
}));
vi.mock('@/components/charts/PopularRepos', () => ({
  default: () => <div>Popualar Repos</div>,
}));
vi.mock('@/components/charts/ForkedRepos', () => ({
  default: () => <div>Forked Repos</div>,
}));

const renderUserProfile = async (userName: string) => {
  render(
    <ApolloProvider client={client}>
      <UserProfile userName={userName} />
    </ApolloProvider>
  );
};

describe('UserProfile', () => {
  test('renders UserProfile component', async () => {
    const userName = 'john_doe';
    renderUserProfile(userName);

    expect(await screen.findByText(userName)).toBeInTheDocument();
    expect(await screen.findByRole('img')).toHaveAttribute(
      'src',
      `https://github.com/images/${userName}.jpg`
    );
    expect(
      await screen.findByText(/full-stack developer/i)
    ).toBeInTheDocument();
    expect(await screen.findByRole('link')).toHaveAttribute(
      'href',
      `https://github.com/${userName}`
    );
  });

  test('renders error message when request fails', async () => {
    const userName = 'request-error';
    renderUserProfile(userName);
    expect(await screen.findByText(/there was an error/i)).toBeInTheDocument();
  });

  test('renders error message when user no found', async () => {
    const userName = 'invalid-username';
    renderUserProfile(userName);
    expect(
      await screen.findByText(/could not resolve to a user/i)
    ).toBeInTheDocument();
  });
});
