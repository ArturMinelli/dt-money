import { ReactNode, useCallback, useEffect, useState } from 'react'
import { createContext } from 'use-context-selector'
import { api } from '../lib/axios'

interface Transaction {
  id: number
  description: string
  type: 'income' | 'outcome'
  category: string
  price: number
  createdAt: string
}

interface CreateTransactionInputs {
  description: string
  price: number
  category: string
  type: 'income' | 'outcome'
}

export interface TransactionContextType {
  transactions: Transaction[];
  isNewTransactionModalOpen: boolean;
  fetchTransactions: (query?: string) => Promise<void>;
  createTransaction: (data: CreateTransactionInputs) => void;
  toggleModal: () => void;
}

export const TransactionsContext = createContext({} as TransactionContextType)

interface TransactionsProviderProps {
  children: ReactNode
}

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState<boolean>(false)

  const fetchTransactions = useCallback(async (query?: string) => {
    const response = await api.get('/transactions', {
      params: {
        _sort: 'createdAt',
        _order: 'desc',
        q: query,
      },
    })

    console.log(response)
    setTransactions(response.data)
  }, [])

  const createTransaction = useCallback(
    async (data: CreateTransactionInputs) => {
      const { description, price, category, type } = data

      const response = await api.post('transactions', {
        description,
        price,
        category,
        type,
        createdAt: new Date(),
      })
    },
    [],
  )

  function toggleModal() {
    setIsNewTransactionModalOpen((state) => !state)
  }

  useEffect(() => {
    fetchTransactions()
  }, [fetchTransactions, isNewTransactionModalOpen])

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        isNewTransactionModalOpen,
        fetchTransactions,
        createTransaction,
        toggleModal,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  )
}
