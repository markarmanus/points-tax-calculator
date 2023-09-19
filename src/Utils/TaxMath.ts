import { TaxBracket } from "../Interfaces/Taxes";

export interface BracketOwedTaxes {
  label: string;
  owed: number;
}
export interface AllTaxesOwed {
  total: number;
  taxesByBracket: BracketOwedTaxes[];
  effectiveRate: string;
  afterTaxIncome: number;
}
const getOwedTaxInBracket = (income: number, bracket: TaxBracket): BracketOwedTaxes => {
  const label = `${bracket.min || 0} - ${bracket.max || "∞"}`;
  const owed = Math.max(income - bracket.min, 0) * bracket.rate;
  return { label, owed: Number(owed.toFixed(2)) };
};

const calculateTaxes = (income: number, brackets: TaxBracket[]): AllTaxesOwed => {
  let totalTax = 0;
  let remainingIncome = income;
  const taxesByBracket: BracketOwedTaxes[] = [];
  const sortedBrackets = brackets.sort((a, b) => b.min - a.min);
  sortedBrackets.forEach((bracket) => {
    const owedInBracket: BracketOwedTaxes = getOwedTaxInBracket(remainingIncome, bracket);
    taxesByBracket.push(owedInBracket);
    remainingIncome = Math.min(bracket.min, remainingIncome);
    totalTax += owedInBracket.owed;
  });
  const effectiveRate = Number(((totalTax / income) * 100).toFixed(2)) + "%";
  const afterTaxIncome = Number((income - totalTax).toFixed(2));
  return { total: totalTax, taxesByBracket, effectiveRate, afterTaxIncome };
};

export { calculateTaxes, getOwedTaxInBracket };
