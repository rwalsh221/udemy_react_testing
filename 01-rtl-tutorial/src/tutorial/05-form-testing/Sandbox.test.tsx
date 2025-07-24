import { render, screen, logRoles } from '@testing-library/react';
import Sandbox from './Sandbox';
import userEvent, { UserEvent } from '@testing-library/user-event';

describe('05-form-testing', () => {
  test('inputs should be initially empty', () => {
    const { container } = render(<Sandbox />);
    screen.debug();
    logRoles(container);

    const emailInputEl = screen.getByRole('textbox', { name: /email/i });
    expect(emailInputEl).toHaveValue('');

    const passwordInputEl = screen.getByLabelText('Password');
    expect(passwordInputEl).toHaveValue('');

    const confirmPasswordInputEl = screen.getByLabelText('Confirm Password');
    expect(confirmPasswordInputEl).toHaveValue('');
  });

  test('should be able to type in input', async () => {
    const user = userEvent.setup();
    render(<Sandbox />);

    const emailInputEl = screen.getByRole('textbox', { name: /email/i });
    await user.type(emailInputEl, 'test@test.com');
    expect(emailInputEl).toHaveValue('test@test.com');

    const passwordInputEl = screen.getByLabelText('Password');
    await user.type(passwordInputEl, '12345');
    expect(passwordInputEl).toHaveValue('12345');

    const confirmPasswordInputEl = screen.getByLabelText('Confirm Password');
    await user.type(confirmPasswordInputEl, '12345');
    expect(confirmPasswordInputEl).toHaveValue('12345');
  });
});
