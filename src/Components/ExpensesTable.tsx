import { FC } from 'react';
import { ExpensesTableProps, Transaction } from './types';

export const ExpensesTable: FC<ExpensesTableProps> = ({
  headers,
  rows,
}) => {
  const dateFormatter = (datetime: string) => {
    const datetimeSplit = datetime.split('T');
    const timeSplit = datetimeSplit[1].split(':');

    const date = datetimeSplit[0].replace('-', '/');
    const time = `${timeSplit[0]}:${timeSplit[1]}`;

    return `${time} - ${date}`;
  } 

  return(
    <table>
      <thead>
        <tr>
          {headers.map((header: string) => (
            <th key={`row-${header}`}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows?.map((row: Transaction, i: number) => (
          <tr key={`row-${i}`}>
            <td key={`item-${i}-id`}>{row.id}</td>
            <td key={`item-${i}-date`}>{dateFormatter(row.date)}</td>
            <td key={`item-${i}-amount`}>{`£${row.amount}`}</td>
            <td key={`item-${i}-merchant`}>{row.merchant}</td>
            <td key={`item-${i}-category`}>{row.category}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
