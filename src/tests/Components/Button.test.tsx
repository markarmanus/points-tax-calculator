/// <reference lib="dom" />
/// <reference lib="dom.iterable" />

import { test, describe, mock, expect, beforeEach } from "bun:test";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import Button from "../../Components/Button";
import COPY from "../../Constants/Copy";

describe("Button", () => {
  beforeEach(() => {
    cleanup();
  });

  test("Renders Text Prop", async () => {
    render(<Button text={COPY.Submit} />);
    screen.getByText(COPY.Submit);
    cleanup();
    expect(() => {
      screen.getByText(COPY.Submit);
    }).toThrow();
  });

  test("Runs OnClick Function when Clicking", async () => {
    const onClickMock = mock(() => {});
    render(<Button text={COPY.Submit} onClick={onClickMock} />);
    fireEvent.click(screen.getByText(COPY.Submit));
    expect(onClickMock).toHaveBeenCalled();
  });

  test("Respects Container Style Prop", async () => {
    const containerStyle = { backgroundColor: "red" };
    render(<Button text={COPY.Submit} containerStyle={containerStyle} />);
    expect(screen.getByText(COPY.Submit).parentElement?.style.backgroundColor).toEqual("red");
  });

  test("Respects Button Style Prop", async () => {
    const buttonStyle = { color: "red" };
    render(<Button text={COPY.Submit} buttonStyle={buttonStyle} />);
    expect(screen.getByText(COPY.Submit).style.color).toEqual("red");
  });
});
