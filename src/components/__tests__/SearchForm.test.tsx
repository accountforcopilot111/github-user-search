import { render, screen, fireEvent, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import { SearchForm } from "../SearchForm";

describe("SearchForm", () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it("calls onSubmit with the correct value after debounce period", () => {
    const onSubmitMock = jest.fn();
    render(<SearchForm onSubmit={onSubmitMock} />);

    const inputElement = screen.getByRole("textbox", {
      name: /GitHub Username/i,
    });
    fireEvent.change(inputElement, { target: { value: "testuser" } });

    expect(onSubmitMock).not.toHaveBeenCalled();

    act(() => {
      jest.advanceTimersByTime(2000);
    });

    expect(onSubmitMock).toHaveBeenCalledTimes(1);
    expect(onSubmitMock).toHaveBeenCalledWith("testuser");
  });
});
