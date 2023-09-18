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
    onChangeMock.mockClear();
  });

  test("Renders Options Properly", () => {
    render(<RadioGroup {...defaultProps} />);
    screen.getByText(defaultProps.options[0].text);
    screen.getByText(defaultProps.options[1].text);
    screen.getByText(defaultProps.options[2].text);
  });

  test("Runs OnChange Function When Selecting Options", async () => {
    render(<RadioGroup {...defaultProps} />);
    await userEvent.click(screen.getByText(defaultProps.options[0].text));
    await userEvent.click(screen.getByText(defaultProps.options[1].text));
    await userEvent.click(screen.getByText(defaultProps.options[2].text));
    expect(onChangeMock).toHaveBeenCalledTimes(3);
    const values = defaultProps.options.map((option) => [option.value]);
    expect(onChangeMock.mock.calls).toEqual(values);
  });

  test("Renders Group Label", () => {
    render(<RadioGroup {...defaultProps} />);
    screen.getByText("Test:");
  });
});
