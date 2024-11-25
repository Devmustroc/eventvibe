import { render, screen } from '@testing-library/react'
import EventPage from '@/app/events/page'
import { getAllEvents } from '@/app/actions/getAllEvents'
import getCurrentUser from '@/app/actions/getCurrentUser'

jest.mock('@/app/actions/getAllEvents')
jest.mock('@/app/actions/getCurrentUser')

describe('EventPage', () => {
    const mockEvents = [
        {
            id: '1',
            title: 'Test Event',
            description: 'Test Description',
            price: 100,
            // ... autres propriétés nécessaires
        }
    ]

    beforeEach(() => {
        ;(getAllEvents as jest.Mock).mockResolvedValue(mockEvents)
        ;(getCurrentUser as jest.Mock).mockResolvedValue({ id: '1' })
    })

    it('renders event list when data is available', async () => {
        render(await EventPage())
        expect(screen.getByText('Test Event')).toBeInTheDocument()
    })
})
