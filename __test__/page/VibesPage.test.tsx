import { render, screen } from '@testing-library/react'
import VibePage from '@/app/vibes/page'
import getReservation from '@/app/actions/getReservation'

jest.mock('@/app/actions/getReservation')

describe('VibesPage', () => {
    const mockReservations = [
        {
            id: '1',
            listing: {
                title: 'Reserved Event',
                // ... autres propriétés
            }
        }
    ]

    beforeEach(() => {
        ;(getReservation as jest.Mock).mockResolvedValue(mockReservations)
    })

    it('renders reservations list', async () => {
        render(await VibePage())
        expect(screen.getByText('Reserved Event')).toBeInTheDocument()
    })

    it('shows empty state when no reservations', async () => {
        ;(getReservation as jest.Mock).mockResolvedValue([])
        render(await VibePage())
        expect(screen.getByText('No vibes')).toBeInTheDocument()
    })
})