import '@testing-library/jest-dom'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { EventCard } from '@/app/components/events/EventCard'
import userEvent from '@testing-library/user-event'
import { useRouter } from 'next/navigation'

// Mock next/navigation
jest.mock('next/navigation', () => ({
    useRouter: jest.fn()
}))

const mockRouter = {
    push: jest.fn()
}

const mockEvent = {
    id: '1',
    title: 'Test Event',
    description: 'Test Description',
    imageSrc: '/test-image.jpg',
    createdAt: new Date().toISOString(),
    category: 'test',
    price: 100,
    locationValue: 'FR',
    userId: '1',
    startDate: new Date().toISOString(),
    endDate: new Date().toISOString(),
    guestCount: 10,
    remaingPlaces: 5,
    address: 'Test Address',
    zipcode: '12345',
    city: 'Test City',
    rating: 4.5
}

describe('EventCard Component', () => {
    beforeEach(() => {
        jest.clearAllMocks()
        ;(useRouter as jest.Mock).mockReturnValue(mockRouter)
    })

    it('renders event details correctly', () => {
        render(<EventCard event={mockEvent} />)

        expect(screen.getByText((content, element) => content.startsWith(mockEvent.title))).toBeInTheDocument()
        expect(screen.getByText(`${mockEvent.price} €`)).toBeInTheDocument()
        expect(screen.getByText(mockEvent.city)).toBeInTheDocument()
        expect(screen.getByAltText(mockEvent.title)).toHaveAttribute('src', expect.stringContaining(mockEvent.imageSrc))
    })

    it('displays remaining places correctly', () => {
        render(<EventCard event={mockEvent} />)
        
        expect(screen.getByText(`${mockEvent.remaingPlaces} places restantes`)).toBeInTheDocument()
    })

    it('shows "Complet" when no remaining places', () => {
        const fullEvent = { ...mockEvent, remaingPlaces: 0 }
        render(<EventCard event={fullEvent} />)
        
        expect(screen.getByText('Complet')).toBeInTheDocument()
    })

    it('navigates to event details page on click', async () => {
        render(<EventCard event={mockEvent} />)
        
        const card = screen.getByRole('article')
        await userEvent.click(card)
        
        expect(mockRouter.push).toHaveBeenCalledWith(`/events/${mockEvent.id}`)
    })

    it('displays event rating correctly', () => {
        render(<EventCard event={mockEvent} />)
        
        expect(screen.getByText(mockEvent.rating.toString())).toBeInTheDocument()
    })

    it('formats date correctly', () => {
        render(<EventCard event={mockEvent} />)
        
        const formattedDate = new Date(mockEvent.startDate).toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        })
        expect(screen.getByText(formattedDate)).toBeInTheDocument()
    })

    it('handles missing image gracefully', () => {
        const eventWithoutImage = { ...mockEvent, imageSrc: '' }
        render(<EventCard event={eventWithoutImage} />)
        
        const fallbackImage = screen.getByAltText(eventWithoutImage.title)
        expect(fallbackImage).toHaveAttribute('src', expect.stringContaining('default-event-image.jpg'))
    })

    it('applies hover effects correctly', async () => {
        render(<EventCard event={mockEvent} />)
        
        const card = screen.getByRole('article')
        fireEvent.mouseEnter(card)
        
        await waitFor(() => {
            expect(card).toHaveClass('hover:scale-105')
            expect(card).toHaveClass('transition')
        })
    })
})