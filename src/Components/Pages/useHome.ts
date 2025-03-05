import { useState, useEffect, MutableRefObject } from 'react';
import { PageResults, Transaction } from '../types';

export const useHome = (isMounted: MutableRefObject<boolean>) => {
  const [page, setPage] = useState<number>(1);
  const [rows, setRows] = useState<Transaction[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);

  const headers = ['ID', 'Date', 'Amount', 'Merchant', 'Category'];

  useEffect(() => {
    isMounted.current = true;
    const abortController = new AbortController();

    fetchExpenseRows(abortController);

    return () => {
      abortController.abort();
      isMounted.current = false;
    };
  }, []);

  const fetchExpenseRows = async (abortController: AbortController): Promise<PageResults | null> => {
    setIsLoading(true);

    try {
      const response: Response = await fetch(
        `https://tip-transactions.vercel.app/api/transactions?page=${page}`,
        { signal: abortController.signal },
      );

      const responseJson = await response.json();

      if (!response.ok) {
        console.error(`Error with status ${response.status}`, responseJson);

        setIsLoading(false);
        setHasError(true);

        return null;
      }

      setRows(responseJson.transactions);
      setIsLoading(false);

      return responseJson;
    } catch (error) {
      if (!(error instanceof Error)) {
        console.error('Unexpected object caught as error, ', error);
        throw error;
      }

      if (error.name === 'AbortError') {
        throw error;
      } 

      console.error('Error in FetchExpenseRows', error);
      return null;
    }
  };

  return {
    page,
    headers,
    rows,
    isLoading,
    hasError,
    setPage,
    setRows,
  }
};
