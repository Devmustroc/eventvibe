import { render, fireEvent, screen } from '@testing-library/react'
import { Counter } from '@/app/components/input/Counter'

describe('Counter', () => {
    const mockOnChange = jest.fn()

    beforeEach(() => {
        jest.clearAllMocks()
    })

    it('renders with initial value', () => {
        render(
            <Counter
                title="Test Counter"
                subtitle="Test Subtitle"
                value={1}
                onChange={mockOnChange}
            />
        )
        expect(screen.getByDisplayValue('1')).toBeInTheDocument()
    })

    it('increments value when plus button clicked', () => {
        render(
            <Counter
                title="Test Counter"
                subtitle="Test Subtitle"
                value={1}
                onChange={mockOnChange}
            />
        )

        fireEvent.click(screen.getByLabelText('increment'))
        expect(mockOnChange).toHaveBeenCalledWith(2)
    })

    it('decrements value when minus button clicked', () => {
        render(
            <Counter
                title="Test Counter"
                subtitle="Test Subtitle"
                value={2}
                onChange={mockOnChange}
            />
        )

        fireEvent.click(screen.getByLabelText('decrement'))
        expect(mockOnChange).toHaveBeenCalledWith(1)
    })

    it('does not decrement below 1', () => {
        render(
            <Counter
                title="Test Counter"
                subtitle="Test Subtitle"
                value={1}
                onChange={mockOnChange}
            />
        )

        fireEvent.click(screen.getByLabelText('decrement'))
        expect(mockOnChange).not.toHaveBeenCalled()
    })
})