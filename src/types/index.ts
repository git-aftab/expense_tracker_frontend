// User Types 
export interface User{
    id: string;
    name: string;
    email: string;
    isPremium: boolean;
    premiumExpiresAt?: string;
}

export interface AuthResponse{
    message: string;
    token: string;
    user: User;
}
export interface LoginCredentials{
    email:string;
    password:string;
}
export interface RegisterCredentials{
    name: string;
    email: string;
    password:string;
}

// Expenses
export interface Expense {
    _id: string;
    userId: string;
    amount: number;
    category: string;
    description: string;
    date: string;
    createdAt: string;
}
export interface ExpensesResponse {
    total: number;
    expenses: Expense[];
}
export interface AddExpenseData {
    amount:number;
    category: string;
    description: string;
    date?:string;
}

// Category Type
export type Category = 'Food' | 'Transport' | 'Entertainment' | 'Shopping' | 'Bills' | 'Health' | 'Other';

export const CATEGORIES: Category[] = [
    'Food',
    'Transport',
    'Entertainment',
    'Shopping',
    'Bills',
    'Health',
    'Other'
]

// Payment Types
export interface PaymentOrder {
    orderId:string;
    amount: number;
    currency:string;
    keyId: string;
}
export interface PremiumStatus {
    isPremium: boolean;
    premiumExpiresAt?:string;
}