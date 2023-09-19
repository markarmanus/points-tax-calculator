/// <reference lib="dom" />
/// <reference lib="dom.iterable" />

import { test, describe, mock, expect, beforeEach } from "bun:test";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import Button from "../../Components/Button";

describe("Test Button Component", () => {
  beforeEach(() => {
    cleanup();
  });

  test("Renders Text Prop", () => {
    render(<Button text={"Test"} />);
    screen.getByText("Test");
  });

  test("Runs OnClick Function when Clicking", () => {
    const onClickMock = mock(() => {});
    render(<Button text={"Test"} onClick={onClickMock} />);
    fireEvent.click(screen.getByText("Test"));
    expect(onClickMock).toHaveBeenCalled();
  });

  test("Respects Container Style Prop", () => {
    const containerStyle = { backgroundColor: "red" };
    render(<Button text={"Test"} containerStyle={containerStyle} />);
    expect(screen.getByText("Test").parentElement?.style.backgroundColor).toEqual("red");
  });

  test("Respects Button Style Prop", () => {
    const buttonStyle = { color: "red" };
    render(<Button text={"Test"} buttonStyle={buttonStyle} />);
    expect(screen.getByText("Test").style.color).toEqual("red");
  });
});
