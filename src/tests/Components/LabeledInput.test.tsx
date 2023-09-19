/// <reference lib="dom" />
/// <reference lib="dom.iterable" />

import { test, describe, mock, expect, beforeEach } from "bun:test";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import LabeledInput from "../../Components/LabeledInput";

describe("Test LabeledInput Component", () => {
  const onChangeMock = mock(() => {});
  const validatorMock = mock(() => true);
  const defaultProps = {
    errorMessage: "ErrorTest",
    type: "number",
    placeholder: "PlaceholderTest",
    onChange: onChangeMock,
    label: "TestLabel",
    validator: validatorMock,
  };
  beforeEach(() => {
    cleanup();
    onChangeMock.mockClear();
    validatorMock.mockClear();
  });

  test("Renders Input Label", () => {
    render(<LabeledInput {...defaultProps} />);
    screen.getByText(new RegExp(defaultProps.label, "i"));
  });

  test("Respects placeholder prop", () => {
    render(<LabeledInput {...defaultProps} />);
    screen.getByPlaceholderText(defaultProps.placeholder);
  });

  test("Calls OnChange When Editing Text", async () => {
    render(<LabeledInput {...defaultProps} />);
    const input = screen.getByPlaceholderText(defaultProps.placeholder);
    fireEvent.change(input, { target: { value: "23" } });
    expect(onChangeMock).toHaveBeenCalled();
    expect(onChangeMock.mock.calls).toEqual([["23"]]);
  });

  test("Respect type prop", async () => {
    render(<LabeledInput {...defaultProps} type="number" />);
    const input = screen.getByPlaceholderText(defaultProps.placeholder);
    fireEvent.change(input, { target: { value: "abc" } });
    expect(onChangeMock).not.toHaveBeenCalled();
  });

  test("Renders Error Massage When Validator Returns False", async () => {
    validatorMock.mockReturnValue(false);
    render(<LabeledInput {...defaultProps} />);
    const input = screen.getByPlaceholderText(defaultProps.placeholder);
    fireEvent.change(input, { target: { value: "100" } });
    screen.getByText(defaultProps.errorMessage);
    validatorMock.mockReturnValue(true);
    fireEvent.change(input, { target: { value: "300" } });
    expect(() => {
      screen.getByText(defaultProps.errorMessage);
    }).toThrow();
  });
});
