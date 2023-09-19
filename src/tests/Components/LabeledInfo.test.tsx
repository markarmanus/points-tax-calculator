/// <reference lib="dom" />
/// <reference lib="dom.iterable" />

import { test, describe, beforeEach } from "bun:test";
import { render, screen, cleanup } from "@testing-library/react";
import LabeledInfo from "../../Components/LabeledInfo";

describe("Test LabeledInfo Component", () => {
  beforeEach(() => {
    cleanup();
  });

  test("Renders Label", () => {
    render(<LabeledInfo label="TestLabel" info="TestInfo" />);
    screen.getByText("TestLabel");
  });

  test("Renders Info", () => {
    render(<LabeledInfo label="TestLabel" info="TestInfo" />);
    screen.getByText("TestInfo");
  });
});
