import React from 'react'
import { fireEvent, render } from '@testing-library/react'
import { NavItem } from './NavItem'

describe('<NavItem />', () => {
  it('renders NavItem component', () => {
    const { getByText } = render(<NavItem value="Home" />)
    const linkElement = getByText(/Home/i)
    expect(linkElement).toBeInTheDocument()
  })

  it('Expands Nav group', () => {
    const { getByTestId } = render(<NavItem value="Group" isGroup isOpen={false} />)
    const buttonElement = getByTestId('nav-group')
    expect(buttonElement).toHaveAttribute('aria-expanded', 'false')
    fireEvent.click(buttonElement)
    expect(buttonElement).toHaveAttribute('aria-expanded', 'true')
  })

  it('sets NavItem component to private', () => {
    const { getByTestId } = render(<NavItem value="Group" isGroup isPrivate={false} />)
    const buttonElement = getByTestId('privacy-toggle')
    expect(buttonElement).toHaveAttribute('data-aria-readonly', 'false')
    fireEvent.click(buttonElement)
    expect(buttonElement).toHaveAttribute('data-aria-readonly', 'true')
  })

  it('sets NavItem component to public', () => {
    const { getByTestId } = render(<NavItem value="Group" isGroup isPrivate />)
    const buttonElement = getByTestId('privacy-toggle')
    expect(buttonElement).toHaveAttribute('data-aria-readonly', 'true')
    fireEvent.click(buttonElement)
    expect(buttonElement).toHaveAttribute('data-aria-readonly', 'false')
  })

  it('sets NavItem component to visible', () => {
    const { getByTestId } = render(<NavItem value="Group" isGroup isVisible={false} />)
    const buttonElement = getByTestId('visibility-toggle')
    expect(buttonElement).toHaveAttribute('data-aria-hidden', 'false')
    fireEvent.click(buttonElement)
    expect(buttonElement).toHaveAttribute('data-aria-hidden', 'true')
  })

  it('sets NavItem component to hidden', () => {
    const { getByTestId } = render(<NavItem value="Group" isGroup isVisible />)
    const buttonElement = getByTestId('visibility-toggle')
    expect(buttonElement).toHaveAttribute('data-aria-hidden', 'true')
    fireEvent.click(buttonElement)
    expect(buttonElement).toHaveAttribute('data-aria-hidden', 'false')
  })
})
