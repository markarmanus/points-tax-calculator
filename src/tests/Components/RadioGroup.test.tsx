/// <reference lib="dom" />
/// <reference lib="dom.iterable" />

import { test, describe, mock, expect, beforeEach } from "bun:test";
import { render, screen, cleanup } from "@testing-library/react";
import RadioGroup from "../../Components/RadioGroup";
import userEvent from "@testing-library/user-event";

describe("RadioGroup", () => {
  const onChangeMock = mock(() => {});
  const defaultProps = {
    options: [
      { text: "Option1", value: "1" },
      { text: "Option2", value: "2" },
      { text: "Option3", value: "3" },
    ],
    onChange: onChangeMock,
    groupLabel: "Test",
  };
  beforeEach(() => {
    cleanup();
  });

  test("Renders Options Properly", () => {
    render(<RadioGroup {...defaultProps} />);
    screen.getByText("Option1");
    screen.getByText("Option2");
    screen.getByText("Option3");
    cleanup();
    expect(() => {
      screen.getByText("Option4");
    }).toThrow();
  });

  test("Runs OnChange Function When Selecting Options", async () => {
    render(<RadioGroup {...defaultProps} />);
    await userEvent.click(screen.getByText("Option1"));
    await userEvent.click(screen.getByText("Option2"));
    await userEvent.click(screen.getByText("Option3"));
    expect(onChangeMock).toHaveBeenCalledTimes(3);
    expect(onChangeMock.mock.calls).toEqual([["1"], ["2"], ["3"]]);
  });

  test("Renders Group Label", () => {
    render(<RadioGroup {...defaultProps} />);
    screen.getByText("Test:");
  });
});
