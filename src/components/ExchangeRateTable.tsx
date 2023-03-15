import React from "react";
import styled from "styled-components";
import { ExchangeRate } from "../useExchangeRates";

interface ExchangeRateTableProps {
  exchangeRates: ExchangeRate[] | undefined;
}

export const ExchangeRateTable: React.FC<ExchangeRateTableProps> = ({
  exchangeRates,
}) => {
  return (
    <Table>
      <thead>
        <tr>
          <th>Currency</th>
          <th>Exchange Rate</th>
        </tr>
      </thead>
      <tbody>
        {(exchangeRates ?? []).map((rate: ExchangeRate) => (
          <tr key={rate.currency}>
            <TableCell>
              {rate.amount} {rate.currency}
            </TableCell>
            <TableCell>{(rate.rate * rate.amount).toFixed(3)}</TableCell>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

const Table = styled.table`
  width: 60%;
  margin: 0 auto;
  border-collapse: collapse;
`;

const TableCell = styled.td`
  padding: 0.5rem;
  text-align: center;
`;
