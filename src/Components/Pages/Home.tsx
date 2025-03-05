import { FC, useRef } from 'react';
import { useHome } from './useHome';
import { ExpensesTable } from '../ExpensesTable';

export const Home: FC = () => {
  const isMounted = useRef(false);

  const {
    headers,
    rows,
    isLoading,
    hasError,
  } = useHome(isMounted);

  if (isLoading) {
    return(
      <div>Loading...</div>
    );
  }

  if (hasError) {
    return(
      <div>Error!</div>
    );
  }

  return (
    <div>
      <h1>Expenses</h1>
      <ExpensesTable
        headers={headers}
        rows={rows}
      />
    </div>
  );
}
