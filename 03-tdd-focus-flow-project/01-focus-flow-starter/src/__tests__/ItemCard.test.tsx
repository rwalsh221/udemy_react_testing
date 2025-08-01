import { render, screen } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import ItemCard from "../components/ItemCard";
import { type Item } from "../utils";
import userEvent from "@testing-library/user-event";

type MockProps = Item & {
  onDelete: (id: string) => void;
};

describe("ItemCard Component", () => {
  const mockProps: MockProps = {
    id: "1",
    title: "title1",
    description: "description 1",
    category: "important",
    onDelete: vi.fn(),
  };

  test("renders card with correct content", () => {
    render(<ItemCard {...mockProps} />);
    expect(screen.getByRole("heading", { name: /title1/i }));
    expect(screen.getByText("description 1")).toBeInTheDocument();
    expect(screen.getByText("important")).toBeInTheDocument();
  });

  test("calls on delete when delete button is clicked", async () => {
    const user = userEvent.setup();
    render(<ItemCard {...mockProps} />);

    const deleteBtn = screen.getByRole("button", { name: "delete task : 1" });
    await user.click(deleteBtn);
    expect(mockProps.onDelete).toHaveBeenCalledWith("1");
  });
});
