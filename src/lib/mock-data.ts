import type { Transaction, Contact, User } from '@/types';

export const user: User = {
    name: 'Rohan Sharma',
    avatar: 'https://placehold.co/100x100/9400D3/FFFFFF.png',
    balance: 5420.50,
};

export const transactions: Transaction[] = [
  {
    id: 'txn_1',
    date: '2024-07-20T10:30:00Z',
    name: 'Priya Patel',
    description: 'Dinner at Masala Grill',
    amount: 1250.00,
    type: 'debit',
    status: 'Completed',
    avatar: 'https://placehold.co/100x100/007BA7/FFFFFF.png'
  },
  {
    id: 'txn_2',
    date: '2024-07-20T08:15:00Z',
    name: 'Work Salary',
    description: 'July Salary',
    amount: 50000.00,
    type: 'credit',
    status: 'Completed',
    avatar: 'https://placehold.co/100x100/22C55E/FFFFFF.png'
  },
  {
    id: 'txn_3',
    date: '2024-07-19T18:00:00Z',
    name: 'Anjali Singh',
    description: 'Movie tickets',
    amount: 600.00,
    type: 'debit',
    status: 'Completed',
    avatar: 'https://placehold.co/100x100/F97316/FFFFFF.png'
  },
  {
    id: 'txn_4',
    date: '2024-07-18T14:45:00Z',
    name: 'Online Shopping',
    description: 'New headphones',
    amount: 2500.00,
    type: 'debit',
    status: 'Completed',
    avatar: 'https://placehold.co/100x100/3B82F6/FFFFFF.png'
  },
    {
    id: 'txn_5',
    date: '2024-07-17T12:00:00Z',
    name: 'Vikram Kumar',
    description: 'Pending Request',
    amount: 500.00,
    type: 'credit',
    status: 'Pending',
    avatar: 'https://placehold.co/100x100/6366F1/FFFFFF.png'
  },
  {
    id: 'txn_6',
    date: '2024-07-16T09:00:00Z',
    name: 'Electricity Bill',
    description: 'Payment failed',
    amount: 1800.00,
    type: 'debit',
    status: 'Failed',
    avatar: 'https://placehold.co/100x100/EF4444/FFFFFF.png'
  }
];

export const contacts: Contact[] = [
  { id: 'contact_1', name: 'Priya Patel', upiId: 'priya.patel@okbank', avatar: 'https://placehold.co/100x100/007BA7/FFFFFF.png' },
  { id: 'contact_2', name: 'Anjali Singh', upiId: 'anjali.singh@ybl', avatar: 'https://placehold.co/100x100/F97316/FFFFFF.png' },
  { id: 'contact_3', name: 'Vikram Kumar', upiId: 'vikram.k@axl', avatar: 'https://placehold.co/100x100/6366F1/FFFFFF.png' },
  { id: 'contact_4', name: 'Sameer Khan', upiId: 'sameer.khan@payapp', avatar: 'https://placehold.co/100x100/10B981/FFFFFF.png' },
  { id: 'contact_5', name: 'Neha Gupta', upiId: 'neha.gupta@okaxis', avatar: 'https://placehold.co/100x100/EC4899/FFFFFF.png' },
];
