/// <reference lib="dom" />
/// <reference lib="dom.iterable" />

import { test, describe, mock, expect, beforeEach } from "bun:test";
import { render, screen, cleanup, fireEvent, waitFor } from "@testing-library/react";
import Home from "../../../Pages/Home/Home";
import { userEvent } from "@testing-library/user-event";
import COPY from "../../../Constants/Copy";
import API from "../../../Utils/API";

describe.only("Test Button Component", () => {
  beforeEach(() => {
    cleanup();
  });

  test("Cant Submit Without Income", async () => {
    render(<Home />);
    const submitButton = screen.getByText(COPY.Submit);
    await userEvent.click(screen.getByText("2019"));
    expect(submitButton.getAttribute("disabled")).toBeDefined();
  });

  test("Cant Submit Without Year", () => {
    render(<Home />);
    const incomeInput = screen.getByPlaceholderText(COPY.Income);
    fireEvent.change(incomeInput, { target: { value: "650000" } });
    const submitButton = screen.getByText("Submit");
    expect(submitButton.getAttribute("disabled")).toBeDefined();
  });

  test("Cant Submit and Shows Error on Negative Income", () => {
    render(<Home />);
    const incomeInput = screen.getByPlaceholderText(COPY.Income);
    fireEvent.change(incomeInput, { target: { value: "-650000" } });
    const submitButton = screen.getByText("Submit");
    screen.getByText(COPY.IncomeMoreThanZero);
    expect(submitButton.getAttribute("disabled")).toBeDefined();
  });

  test("Can Submit With Valid Input", async () => {
    render(<Home />);
    API.getTaxBracketData = mock(() => Promise.resolve([{ min: 0, max: 50000, rate: 0.13 }]));
    const incomeInput = screen.getByPlaceholderText(COPY.Income);
    fireEvent.change(incomeInput, { target: { value: "65000" } });
    await userEvent.click(screen.getByText("2019"));
    const submitButton = screen.getByText("Submit");
    fireEvent.click(submitButton);
    await waitFor(() => screen.getByText(COPY.EffectiveTaxRate));
    await waitFor(() => screen.getByText("13.00%"));
  });
});
