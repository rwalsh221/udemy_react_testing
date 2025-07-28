import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Sandbox from '../Sandbox';
import { getFormElements } from './Form.test';
import { aw } from 'vitest/dist/chunks/reporters.C4ZHgdxQ.js';

describe('Reviews App', () => {
  test('renders Review App title', () => {
    render(<Sandbox />);
    expect(
      screen.getByRole('heading', { level: 1, name: /reviews app/i })
    ).toBeInTheDocument();
  });
  test('add a new review when form is submitted', async () => {
    const user = userEvent.setup();
    render(<Sandbox />);
    const { emailInputEl, ratingSelectEl, textAreaEl, submitBtnEl } =
      getFormElements();

    // fill out form
    await user.type(emailInputEl, 'test@example.com');
    await user.selectOptions(ratingSelectEl, '5');
    await user.type(textAreaEl, 'long review');
    await user.click(submitBtnEl);

    expect(screen.getByText('test@example.com')).toBeInTheDocument();
    expect(screen.getByText('long review')).toBeInTheDocument();
    const stars = '⭐'.repeat(Number('5'));
    expect(screen.getByText(stars)).toBeInTheDocument();
  });

  test('alternative add a new review when form is submitted', async () => {
    const user = userEvent.setup();
    render(<Sandbox />);

    const reviews = screen.queryAllByRole('article');
    expect(reviews).toHaveLength(0);

    const { emailInputEl, ratingSelectEl, textAreaEl, submitBtnEl } =
      getFormElements();

    // fill out form
    await user.type(emailInputEl, 'test@example.com');
    await user.selectOptions(ratingSelectEl, '5');
    await user.type(textAreaEl, 'long review');
    await user.click(submitBtnEl);

    expect(screen.getAllByRole('article')).toHaveLength(1);
  });
});
