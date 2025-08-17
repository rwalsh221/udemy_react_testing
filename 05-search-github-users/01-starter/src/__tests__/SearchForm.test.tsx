import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
// import SearchForm from '@/components/form/SearchForm';
import { toast, useToast } from '../hooks/use-toast';
import SearchForm from '../components/form/SearchForm';

const mockToast = vi.fn();
const setUserNameMock = vi.fn();

vi.mock('@/hooks/use-toast', () => ({
  useToast: () => ({
    toast: mockToast,
  }),
}));

describe('SearchForm', () => {
  const user = userEvent.setup();
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const getFormElements = () => ({
    input: screen.getByRole('textbox', { name: /search/i }),
    button: screen.getByRole('button', { name: /search/i }),
  });

  test('renders the search form correctly', () => {
    render(<SearchForm userName="john_doe" setUserName={setUserNameMock} />);
    const { input, button } = getFormElements();

    expect(input).toHaveValue('john_doe');
    expect(button).toBeInTheDocument();
  });

  test('displays empty input when userName is empty', () => {
    render(<SearchForm userName="" setUserName={setUserNameMock} />);
    const { input } = getFormElements();

    expect(input).toHaveValue('');
  });

  test('updates input value on change', async () => {
    render(<SearchForm userName="" setUserName={setUserNameMock} />);
    const { input } = getFormElements();

    await user.type(input, 'john_doe');
    expect(input).toHaveValue('john_doe');
  });

  test('shows toast when submitting empty input', async () => {
    render(<SearchForm userName="" setUserName={setUserNameMock} />);
    const { button } = getFormElements();

    await user.click(button);

    expect(mockToast).toHaveBeenCalledWith({
      description: 'Please enter a valid username',
    });

    expect(setUserNameMock).not.toHaveBeenCalled();
  });

  test('calls setUserName on valid form submission', async () => {
    render(<SearchForm userName="" setUserName={setUserNameMock} />);
    const { input, button } = getFormElements();

    await user.type(input, 'jane_doe');
    await user.click(button);

    expect(setUserNameMock).toHaveBeenCalledWith('jane_doe');
    expect(mockToast).not.toHaveBeenCalled();
  });
});
