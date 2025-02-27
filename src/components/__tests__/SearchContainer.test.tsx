import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { SearchContainer } from "../SearchContainer";

jest.mock("../SearchForm", () => ({
  SearchForm: (props: { onSubmit: (value: string) => void }) => (
    <input
      data-testid="search-form"
      aria-label="GitHub Username"
      onChange={(e) => props.onSubmit(e.target.value)}
    />
  ),
}));

jest.mock("../UserList", () => ({
  UserList: (props: { username: string }) => (
    <div data-testid="user-list">{props.username}</div>
  ),
}));

describe("SearchContainer", () => {
  it("renders UserList after SearchForm onSubmit is called", () => {
    render(<SearchContainer />);
    const input = screen.getByTestId("search-form");
    fireEvent.change(input, { target: { value: "testuser" } });
    expect(screen.getByTestId("user-list")).toHaveTextContent("testuser");
  });
});
