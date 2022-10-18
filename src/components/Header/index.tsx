import { HeaderContainer, HeaderContent, NewTransactionButton } from './styles'
import * as Dialog from '@radix-ui/react-dialog'

import logoImg from '../../assets/logo.svg'
import { NewTransactionModal } from '../NewTransactionModal'
import { useContextSelector } from 'use-context-selector'
import { TransactionsContext } from '../../contexts/TransactionsContext'

export function Header() {
  const isNewTransactionModalOpen = useContextSelector(
    TransactionsContext,
    (context) => {
      return context.isNewTransactionModalOpen
    },
  )

  const toggleModal = useContextSelector(TransactionsContext, (context) => {
    return context.toggleModal
  })

  return (
    <HeaderContainer>
      <HeaderContent>
        <img src={logoImg} alt="" />

        <Dialog.Root open={isNewTransactionModalOpen}>
          <Dialog.Trigger asChild>
            <NewTransactionButton onClick={toggleModal}>
              Nova transação
            </NewTransactionButton>
          </Dialog.Trigger>

          <NewTransactionModal />
        </Dialog.Root>
      </HeaderContent>
    </HeaderContainer>
  )
}
