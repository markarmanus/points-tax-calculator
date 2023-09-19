import { test, describe, expect, mock } from "bun:test";
import API from "../../Utils/API";

describe("Test getTaxBracketData", () => {
  test("Test response status 404", async () => {
    console.error = mock(() => {});
    global.fetch = mock(() =>
      Promise.reject({
        status: 404,
      })
    );
    API.maxReAttempts = 0;
    expect(async () => {
      await API.getTaxBracketData("2020");
    }).toThrow();
  });

  test("Test successful response", async () => {
    global.fetch = mock(
      () =>
        Promise.resolve({
          status: 200,
          ok: true,
          json: () => Promise.resolve({ tax_brackets: [] }),
        }) as Promise<Response>
    );
    const data = await API.getTaxBracketData("2020");
    expect(data).toEqual([]);
  });
});
