import { render, screen } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import Form from "../components/Form";
import userEvent, { type UserEvent } from "@testing-library/user-event";

const getFormElements = () => ({
  titleInputEl: screen.getByRole("textbox", { name: /title/i }),
  descriptionInputEl: screen.getByRole("textbox", { name: /description/i }),
  categorySelectEl: screen.getByRole("combobox", { name: /category/i }),
  submitButtonEl: screen.getByRole("button", { name: /add task/i }),
});

describe("Form Component", () => {
  let user: UserEvent;
  const mockOnSubmit = vi.fn();
  beforeEach(() => {
    mockOnSubmit.mockClear();
    user = userEvent.setup();
    render(<Form onSubmit={mockOnSubmit} />);
  });

  screen.debug();

  test("renders form with empty fields initially", () => {
    const { titleInputEl, descriptionInputEl, categorySelectEl } =
      getFormElements();
    expect(titleInputEl).toHaveValue("");
    expect(descriptionInputEl).toHaveValue("");
    expect(categorySelectEl).toHaveValue("");
  });

  test("submit form with entered values", async () => {
    const {
      titleInputEl,
      descriptionInputEl,
      categorySelectEl,
      submitButtonEl,
    } = getFormElements();

    await user.type(titleInputEl, "New Task");
    await user.type(descriptionInputEl, "task description");
    await user.selectOptions(categorySelectEl, "urgent");
    await user.click(submitButtonEl);

    expect(mockOnSubmit).toHaveBeenCalledWith({
      title: "New Task",
      description: "task description",
      category: "urgent",
    });
  });

  test("validates required fields", async () => {
    const { submitButtonEl } = getFormElements();

    await user.click(submitButtonEl);
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  test("clears form after submission", async () => {
    const {
      titleInputEl,
      descriptionInputEl,
      categorySelectEl,
      submitButtonEl,
    } = getFormElements();

    await user.type(titleInputEl, "New Task");
    await user.type(descriptionInputEl, "task description");
    await user.selectOptions(categorySelectEl, "urgent");
    await user.click(submitButtonEl);

    expect(titleInputEl).toHaveValue("");
    expect(descriptionInputEl).toHaveValue("");
    expect(categorySelectEl).toHaveValue("");
  });
});
