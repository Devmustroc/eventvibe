import { render, fireEvent, screen } from '@testing-library/react'
import { HeartButton } from '@/app/components/HeartButton'
import useFavorite from '@/app/hooks/useFavorite'

jest.mock('@/app/hooks/useFavorite')

describe('HeartButton', () => {
    const mockToggleFavorite = jest.fn()

    beforeEach(() => {
        ;(useFavorite as jest.Mock).mockReturnValue({
            hasFavorite: false,
            toggleFavorite: mockToggleFavorite
        })
    })

    it('renders heart icon', () => {
        render(<HeartButton organizerId="1" />)
        expect(screen.getByRole('button')).toBeInTheDocument()
    })

    it('calls toggleFavorite when clicked', () => {
        render(<HeartButton organizerId="1" />)
        fireEvent.click(screen.getByRole('button'))
        expect(mockToggleFavorite).toHaveBeenCalled()
    })

    it('shows filled heart when favorited', () => {
        ;(useFavorite as jest.Mock).mockReturnValue({
            hasFavorite: true,
            toggleFavorite: mockToggleFavorite
        })

        render(<HeartButton organizerId="1" />)
        expect(screen.getByRole('button')).toHaveClass('fill-red-600')
    })
})
