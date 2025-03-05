export interface Transaction {
  id: number;
  date: string;
  amount: number;
  merchant: string;
  category: string;
}

export interface AllResults {
  totalTransactions: number;
  transactions: Transaction[];
}

export interface PageResults {
  next: {
    page: number;
    limit: number;
  };
  totalPages: number;
  currentPage: number;
  transactions: Transaction[];
}

export interface ExpensesTableProps {
  headers: string[];
  rows: Transaction[] | null;
}
