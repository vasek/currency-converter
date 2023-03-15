import React, { ChangeEvent } from "react";
import styled from "styled-components";
import { ExchangeRate } from "../useExchangeRates";

interface CurrencyFormProps {
  amount: string;
  selectedCurrency: string;
  exchangeRates: ExchangeRate[] | undefined;
  onAmountChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onCurrencyChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}

export const CurrencyForm: React.FC<CurrencyFormProps> = ({
  amount,
  selectedCurrency,
  exchangeRates,
  onAmountChange,
  onCurrencyChange,
}) => {
  return (
    <Form>
      <FormGroup>
        <Label htmlFor="amount">Amount in CZK:</Label>
        <Input
          type="number"
          id="amount"
          value={amount}
          onChange={onAmountChange}
        />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="currency">Currency:</Label>
        <Select
          id="currency"
          value={selectedCurrency}
          onChange={onCurrencyChange}
        >
          <option value="">Select a currency</option>
          {(exchangeRates ?? []).map((rate: ExchangeRate) => (
            <option key={rate.currency} value={rate.currency}>
              {rate.currency}
            </option>
          ))}
        </Select>
      </FormGroup>
    </Form>
  );
};

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;
`;

const Label = styled.label`
  margin-right: 1rem;
  width: 150px;
  text-align: right;
`;

const Input = styled.input`
  width: 200px;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
`;

const Select = styled.select`
  width: 200px;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
`;
