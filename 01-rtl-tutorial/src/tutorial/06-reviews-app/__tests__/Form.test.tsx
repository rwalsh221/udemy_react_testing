import { render, screen } from '@testing-library/react';
import userEvent, { UserEvent } from '@testing-library/user-event';
import Form from '../Form';

export const getFormElements = () => ({
  emailInputEl: screen.getByRole('textbox', { name: /email/i }),
  ratingSelectEl: screen.getByRole('combobox', { name: /rating/i }),
  textAreaEl: screen.getByRole('textbox', { name: /your review/i }),
  submitBtnEl: screen.getByRole('button', { name: /submit review/i }),
});

describe('Review Form', () => {
  const mockOnSubmit = vi.fn();

  beforeEach(() => {
    mockOnSubmit.mockClear();
  });
  test('renders form elements correctly', () => {
    render(<Form onSubmit={mockOnSubmit} />);
    const { emailInputEl, ratingSelectEl, textAreaEl, submitBtnEl } =
      getFormElements();

    expect(emailInputEl).toHaveValue('');
    expect(ratingSelectEl).toHaveValue('');
    expect(textAreaEl).toHaveValue('');
    expect(submitBtnEl).toBeInTheDocument();
  });

  test('shows error message when review is too short', async () => {
    const user = userEvent.setup();

    render(<Form onSubmit={mockOnSubmit} />);
    const { emailInputEl, ratingSelectEl, textAreaEl, submitBtnEl } =
      getFormElements();

    await user.type(emailInputEl, 'test@test.com');
    await user.selectOptions(ratingSelectEl, '5');
    await user.type(textAreaEl, 'short');
    await user.click(submitBtnEl);

    expect(
      screen.getByText(/review must be at least 10 characters long/i)
    ).toBeInTheDocument();
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  test('submits form with valid data', async () => {
    const user = userEvent.setup();

    render(<Form onSubmit={mockOnSubmit} />);
    const { emailInputEl, ratingSelectEl, textAreaEl, submitBtnEl } =
      getFormElements();

    await user.type(emailInputEl, 'test@test.com');
    await user.selectOptions(ratingSelectEl, '5');
    await user.type(textAreaEl, 'not too short');
    await user.click(submitBtnEl);

    expect(mockOnSubmit).toHaveBeenCalledTimes(1);
    expect(mockOnSubmit).toHaveBeenCalledWith({
      email: 'test@test.com',
      rating: '5',
      text: 'not too short',
    });
  });
});
