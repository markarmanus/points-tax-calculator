import { TaxBracket } from "../Interfaces/Taxes";

class API {
  private static baseURL: string = "http://127.0.0.1:5000";
  private static reAttemptCounter: number = 0;
  static maxReAttempts: number = 3;

  private static sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

  static async getTaxBracketData(year: string): Promise<TaxBracket[]> {
    if (this.reAttemptCounter <= this.maxReAttempts) {
      try {
        const response = await fetch(`${this.baseURL}/tax-calculator/tax-year/${year}`);
        if (response.status === 404) {
          throw new Error("Page not found");
        } else if (response.status === 500) {
          throw new Error("Server error");
        } else if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const json = await response.json();
        return json?.tax_brackets;
      } catch (error) {
        console.error("Failed to Fetch Tax Bracket Data", error);
        this.reAttemptCounter++;
        await this.sleep(300);
        return this.getTaxBracketData(year);
      }
    }
    this.reAttemptCounter = 0;
    throw new Error(`Failed to Fetch Tax Bracket Data, Max Re-Attempt Reached of ${this.maxReAttempts}`);
  }
}
export default API;
