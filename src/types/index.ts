export type Transaction = {
  id: string;
  date: string;
  name: string;
  description: string;
  amount: number;
  type: 'credit' | 'debit';
  status: 'Completed' | 'Pending' | 'Failed';
  avatar: string;
};

export type Contact = {
  id: string;
  name: string;
  upiId: string;
  avatar: string;
};

export type User = {
  name: string;
  avatar: string;
  balance: number;
};
