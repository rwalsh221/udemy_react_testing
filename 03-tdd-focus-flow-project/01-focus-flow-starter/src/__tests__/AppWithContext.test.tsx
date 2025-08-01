import { render, screen } from "@testing-library/react";
import userEvent, { type UserEvent } from "@testing-library/user-event";
import { FlowProvider } from "../FlowContext";
import AppWithContext from "../AppWithContext";

const getFormElements = () => ({
  titleInputEl: screen.getByRole("textbox", { name: /title/i }),
  descriptionInputEl: screen.getByRole("textbox", { name: /description/i }),
  categorySelectEl: screen.getByRole("combobox", { name: /category/i }),
  submitButtonEl: screen.getByRole("button", { name: /add task/i }),
});

const customRenderAppWithContext = () => {
  return render(
    <FlowProvider>
      <AppWithContext />
    </FlowProvider>
  );
};

const addTestItem = async (user: UserEvent) => {
  const { titleInputEl, descriptionInputEl, categorySelectEl, submitButtonEl } =
    getFormElements();

  await user.type(titleInputEl, "test");
  await user.type(descriptionInputEl, "testdescription");
  await user.selectOptions(categorySelectEl, "urgent");
  await user.click(submitButtonEl);
};

describe("AppWithContext component", () => {
  let user: UserEvent;

  beforeEach(() => {
    vi.clearAllMocks();
    user = userEvent.setup();
    customRenderAppWithContext();
  });

  test("renders heading and form elements", () => {
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /focus flow/i,
      })
    ).toBeInTheDocument();

    const elements = getFormElements();
    screen.getByRole("textbox", { name: /title/i });
    screen.getByRole("textbox", { name: /title/i });
    Object.values(elements).forEach((element) => {
      expect(element).toBeInTheDocument();
    });
  });

  test("handles adding an item", async () => {
    const cardsBefore = screen.queryAllByRole("article");
    expect(cardsBefore).toHaveLength(0);

    await addTestItem(user);
    const cardsAfter = screen.getAllByRole("article");
    expect(cardsAfter).toHaveLength(1);

    expect(screen.getByText("test")).toBeInTheDocument();
    expect(screen.getByText("testdescription")).toBeInTheDocument();
    expect(screen.getByText("urgent")).toBeInTheDocument();
  });

  test("handles deleteing an item", async () => {
    await addTestItem(user);

    const deleteBtn = screen.getByRole("button", { name: /delete/i });
    expect(deleteBtn).toBeInTheDocument();

    await user.click(deleteBtn);

    expect(screen.queryByText("test")).not.toBeInTheDocument();
    expect(screen.queryByText("testdescription")).not.toBeInTheDocument();
    expect(screen.queryByText("urgent")).not.toBeInTheDocument();

    expect(screen.queryAllByRole("article")).toHaveLength(0);
  });
});
