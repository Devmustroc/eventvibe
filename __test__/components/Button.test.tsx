import { render, fireEvent, screen } from '@testing-library/react'
import Button from '@/app/components/Button'
import '@testing-library/jest-dom'


describe('Button Component', () => {
    it('renders correctly with label', () => {
        render(<Button label="Test Button" onClick={() => {}} />)
        expect(screen.getByText('Test Button')).toBeInTheDocument()
    })

    it('calls onClick handler when clicked', () => {
        const mockOnClick = jest.fn()
        render(<Button label="Test Button" onClick={mockOnClick} />)
        fireEvent.click(screen.getByText('Test Button'))
        expect(mockOnClick).toHaveBeenCalled()
    })

    it('is disabled when disabled prop is true', () => {
        render(<Button label="Test Button" onClick={() => {}} disabled />)
        expect(screen.getByText('Test Button')).toBeDisabled()
    })
})
