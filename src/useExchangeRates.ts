import { useQuery } from "react-query";

export interface ExchangeRate {
  currency: string;
  rate: number;
  amount: number;
}

async function fetchExchangeRates(): Promise<ExchangeRate[]> {
  const proxyUrl = "https://cors-anywhere.herokuapp.com/";
  const apiUrl =
    "https://www.cnb.cz/en/financial-markets/foreign-exchange-market/central-bank-exchange-rate-fixing/central-bank-exchange-rate-fixing/daily.txt";
  const response = await fetch(proxyUrl + apiUrl);

  const text = await response.text();
  const lines = text.split("\n");
  const rates: ExchangeRate[] = [];

  for (let i = 2; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    const [, , amount, currency, rate] = line.split("|");
    rates.push({
      currency,
      rate: parseFloat(rate.replace(",", ".")) / parseInt(amount),
      amount: parseInt(amount),
    });
  }

  return rates;
}

export function useExchangeRates() {
  return useQuery("exchangeRates", fetchExchangeRates);
}
