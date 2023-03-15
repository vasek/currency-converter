import { useEffect, useState } from "react";
import styled from "styled-components";
import { CurrencyForm, ExchangeRateTable } from "./components";
import { ExchangeRate, useExchangeRates } from "./useExchangeRates";

const App = () => {
  const [amount, setAmount] = useState("");
  const [selectedCurrency, setSelectedCurrency] = useState("");
  const [convertedAmount, setConvertedAmount] = useState<number | null>(null);
  const { data: exchangeRates } = useExchangeRates();

  useEffect(() => {
    if (amount && selectedCurrency) {
      const rate = exchangeRates?.find(
        (r: ExchangeRate) => r.currency === selectedCurrency
      );
      if (rate) {
        setConvertedAmount(parseFloat(amount) / rate.rate);
      }
    } else {
      setConvertedAmount(null);
    }
  }, [amount, selectedCurrency, exchangeRates]);

  return (
    <Container>
      <MainHeading>Exchange Rate Calculator</MainHeading>
      <SubHeading>Co-created by GPT-4</SubHeading>
      <CurrencyForm
        amount={amount}
        selectedCurrency={selectedCurrency}
        exchangeRates={exchangeRates}
        onAmountChange={(e) => setAmount(e.target.value)}
        onCurrencyChange={(e) => setSelectedCurrency(e.target.value)}
      />
      {convertedAmount !== null && (
        <ConversionResult>
          {amount} CZK = {convertedAmount.toFixed(2)} {selectedCurrency}
        </ConversionResult>
      )}
      <ExchangeRateTable exchangeRates={exchangeRates} />
    </Container>
  );
};

const ConversionResult = styled.div`
  font-size: 2rem;
  font-weight: bold;
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  font-family: "Roboto", sans-serif;
`;

const MainHeading = styled.h1`
  font-size: 2rem;
  text-align: center;
  margin-bottom: 1rem;
`;

const SubHeading = styled.h2`
  font-size: 1rem;
  text-align: center;
  margin-bottom: 1.5rem;
  font-weight: 400;
`;

export default App;
