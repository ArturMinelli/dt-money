import { ArrowCircleUp, ArrowCircleDown, CurrencyDollar } from 'phosphor-react'
import { useTransactions } from '../../hooks/useTransactions'
import { priceFormatter } from '../../utils/formatter'
import { SummaryCard, SummaryContainer } from './styles'

export function Summary() {
  const { transactions } = useTransactions()
  const { income, outcome } = transactions.reduce(
    (accum, transaction) => {
      if (transaction.type === 'income') {
        return {
          ...accum,
          income: accum.income + transaction.price,
        }
      } else {
        return {
          ...accum,
          outcome: accum.outcome + transaction.price,
        }
      }
    },
    {
      income: 0,
      outcome: 0,
    },
  )
  const total = income - outcome

  return (
    <SummaryContainer>
      <SummaryCard>
        <header>
          <span>Entradas</span>
          <ArrowCircleUp size={32} color="#00b37e" />
        </header>

        <strong>{priceFormatter.format(income)}</strong>
      </SummaryCard>

      <SummaryCard>
        <header>
          <span>Saídas</span>
          <ArrowCircleDown size={32} color="#f75a68" />
        </header>

        <strong>{priceFormatter.format(outcome)}</strong>
      </SummaryCard>

      <SummaryCard>
        <header>
          <span>Total</span>
          <CurrencyDollar size={32} color="#fff" />
        </header>

        <strong>{priceFormatter.format(total)}</strong>
      </SummaryCard>
    </SummaryContainer>
  )
}
