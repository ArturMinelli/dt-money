import styled from 'styled-components'

export const HeaderContainer = styled.header`
  background: ${({ theme }) => theme['gray-900']};
  padding: 2rem 0 7.5rem;
`

export const HeaderContent = styled.div`
  width: 100%;
  max-width: 1120px;
  margin: 0 auto;
  padding: 0 1.5rem;

  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const NewTransactionButton = styled.button`
  height: 50px;
  padding: 0 1.25rem;
  border: none;
  border-radius: 6px;
  color: ${({ theme }) => theme.white};
  background: ${({ theme }) => theme['green-500']};
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background: ${({ theme }) => theme['gray-700']};
  }
`
