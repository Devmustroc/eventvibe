import { render, screen } from '@testing-library/react'
import { EventCard } from '@/app/components/events/EventCard'

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
    it('renders event details correctly', () => {
        render(<EventCard event={mockEvent} />)

        expect(screen.getByText((content, element) => content.startsWith(mockEvent.title))).toBeInTheDocument()
        expect(screen.getByText(`${mockEvent.price} €`)).toBeInTheDocument()
        expect(screen.getByText(mockEvent.city)).toBeInTheDocument()
    })
})