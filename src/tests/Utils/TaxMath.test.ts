import { test, describe, expect } from "bun:test";
import { TaxBracket } from "../../Interfaces/Taxes";
import { calculateTaxes, getOwedTaxInBracket } from "../../Utils/TaxMath";

const taxBracketsMock: { [key: string]: TaxBracket } = {
  noMax: {
    min: 100,
    rate: 0.2,
  },
  zeroRate: {
    min: 0,
    max: 100,
    rate: 0,
  },
  oneHundredRate: {
    min: 0,
    max: 100,
    rate: 1,
  },
  "100to200": {
    min: 100,
    max: 200,
    rate: 0.2,
  },
  "200to300": {
    min: 200,
    max: 300,
    rate: 0.3,
  },
  "300to400": {
    min: 300,
    max: 400,
    rate: 0.4,
  },
  "400toInfinity": {
    min: 400,
    rate: 0.5,
  },
};

describe("Test getOwedTaxBracket", () => {
  test("Test with no maximum", () => {
    const income = 150;
    const expected = { label: "100 - ∞", owed: 10 };
    const actual = getOwedTaxInBracket(income, taxBracketsMock.noMax);
    expect(actual).toEqual(expected);
  });
  test("Test with 0 Income", () => {
    const income = 0;
    const expected = { label: "0 - 100", owed: 0 };
    const actual = getOwedTaxInBracket(income, taxBracketsMock.zeroRate);
    expect(actual).toEqual(expected);
  });

  test("Test with 100  Tax Rate", () => {
    const income = 100;
    const expected = { label: "0 - 100", owed: 100 };
    const actual = getOwedTaxInBracket(income, taxBracketsMock.oneHundredRate);
    expect(actual).toEqual(expected);
  });
  test("Test with Income Below Range", () => {
    const income = 50;
    const expected = { label: "100 - 200", owed: 0 };
    const actual = getOwedTaxInBracket(income, taxBracketsMock["100to200"]);
    expect(actual).toEqual(expected);
  });
  test("Test with Income Inside Range", () => {
    const income = 150;
    const expected = { label: "100 - 200", owed: 10 };
    const actual = getOwedTaxInBracket(income, taxBracketsMock["100to200"]);
    expect(actual).toEqual(expected);
  });
});

const taxBracketsArr = [
  taxBracketsMock["100to200"],
  taxBracketsMock["200to300"],
  taxBracketsMock["300to400"],
  taxBracketsMock["400toInfinity"],
];

describe("Test calculateTaxes", () => {
  test("Test with income below smallest bracket", () => {
    const income = 50;
    const expected = {
      total: 0,
      taxesByBracket: [
        { label: "400 - ∞", owed: 0 },
        { label: "300 - 400", owed: 0 },
        { label: "200 - 300", owed: 0 },
        { label: "100 - 200", owed: 0 },
      ],
      effectiveRate: "0%",
      afterTaxIncome: 50,
    };
    const actual = calculateTaxes(income, taxBracketsArr);
    expect(actual).toEqual(expected);
  });
  test("Test with income above largest bracket", () => {
    const income = 500;
    const expected = {
      total: 140,
      taxesByBracket: [
        { label: "400 - ∞", owed: 50 },
        { label: "300 - 400", owed: 40 },
        { label: "200 - 300", owed: 30 },
        { label: "100 - 200", owed: 20 },
      ],
      effectiveRate: "28%",
      afterTaxIncome: 360,
    };
    const actual = calculateTaxes(income, taxBracketsArr);
    expect(actual).toEqual(expected);
  });
  test("Test with income inside brackets", () => {
    const income = 250;
    const expected = {
      total: 35,
      taxesByBracket: [
        { label: "400 - ∞", owed: 0 },
        { label: "300 - 400", owed: 0 },
        { label: "200 - 300", owed: 15 },
        { label: "100 - 200", owed: 20 },
      ],
      effectiveRate: "14%",
      afterTaxIncome: 215,
    };
    const actual = calculateTaxes(income, taxBracketsArr);
    expect(actual).toEqual(expected);
  });
});
