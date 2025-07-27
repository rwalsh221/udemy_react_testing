import { render, screen, logRoles } from '@testing-library/react';
import Sandbox from './Sandbox';
import userEvent, { type UserEvent } from '@testing-library/user-event';

const getFormElements = () => ({
  emailInputEl: screen.getByRole('textbox', { name: /email/i }),
  passwordInputEl: screen.getByLabelText('Password'),
  confirmPasswordInputEl: screen.getByLabelText('Confirm Password'),
  submitButtonEl: screen.getByRole('button', { name: /submit/i }),
});

describe('05-form-testing', () => {
  let user: UserEvent;
  beforeEach(() => {
    user = userEvent.setup();
    render(<Sandbox />);
  });

  test('inputs should be initially empty', () => {
    // const { container } = render(<Sandbox />);
    // screen.debug();
    // logRoles(container);

    const { emailInputEl, passwordInputEl, confirmPasswordInputEl } =
      getFormElements();

    expect(emailInputEl).toHaveValue('');

    expect(passwordInputEl).toHaveValue('');

    expect(confirmPasswordInputEl).toHaveValue('');
  });

  test('should be able to type in input', async () => {
    const { emailInputEl, passwordInputEl, confirmPasswordInputEl } =
      getFormElements();

    await user.type(emailInputEl, 'test@test.com');
    expect(emailInputEl).toHaveValue('test@test.com');

    await user.type(passwordInputEl, '12345');
    expect(passwordInputEl).toHaveValue('12345');

    await user.type(confirmPasswordInputEl, '12345');
    expect(confirmPasswordInputEl).toHaveValue('12345');
  });

  test('should show email error if email is invalid', async () => {
    const { emailInputEl, submitButtonEl } = getFormElements();

    expect(screen.queryByText(/invalid email/i)).not.toBeInTheDocument();

    await user.type(emailInputEl, 'invalid');
    await user.click(submitButtonEl);

    expect(screen.queryByText(/invalid email/i)).toBeInTheDocument();
  });

  test('should show password error if password is less than 5 characters', async () => {
    const { emailInputEl, submitButtonEl, passwordInputEl } = getFormElements();

    expect(
      screen.queryByText(/password must be at least 5 characters/i)
    ).not.toBeInTheDocument();

    await user.type(emailInputEl, 'test@test.com');
    user.type(passwordInputEl, 'abcd');
    await user.click(submitButtonEl);

    expect(
      screen.queryByText(/password must be at least 5 characters/i)
    ).toBeInTheDocument();
  });

  test('should show verify password error if passwords dont match', async () => {
    const {
      emailInputEl,
      submitButtonEl,
      passwordInputEl,
      confirmPasswordInputEl,
    } = getFormElements();

    expect(
      screen.queryByText(/passwords do not match/i)
    ).not.toBeInTheDocument();

    await user.type(emailInputEl, 'test@test.com');
    await user.type(passwordInputEl, 'secret');
    await user.type(confirmPasswordInputEl, 'secret1');
    await user.click(submitButtonEl);

    expect(screen.queryByText(/passwords do not match/i)).toBeInTheDocument();
  });

  test('valid input show no errors and clear fields', async () => {
    const {
      emailInputEl,
      submitButtonEl,
      passwordInputEl,
      confirmPasswordInputEl,
    } = getFormElements();

    await user.type(emailInputEl, 'test@test.com');
    await user.type(passwordInputEl, 'secret');
    await user.type(confirmPasswordInputEl, 'secret');
    await user.click(submitButtonEl);

    expect(screen.queryByText(/invalid email/i)).not.toBeInTheDocument();
    expect(
      screen.queryByText(/password must be at least 5 characters/i)
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText(/passwords do not match/i)
    ).not.toBeInTheDocument();

    expect(emailInputEl).toHaveValue('');
    expect(passwordInputEl).toHaveValue('');
    expect(confirmPasswordInputEl).toHaveValue('');
  });
});
