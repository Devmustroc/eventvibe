import { render, fireEvent, screen } from '@testing-library/react'
import Calendar from '@/app/components/input/Calendar'

describe('Calendar', () => {
    const mockOnChange = jest.fn()
    const mockValue = {
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection'
    }
    const mockEvent = {
        address: '123 Main St',
        title: 'Sample Event',
        id: '1',
        imageSrc: '/path/to/image.jpg',
        createdAt: new Date(),
        category: 'Music',
        userId: 'user1',
        description: 'This is a sample event',
        startDate: new Date(),
        endDate: new Date(),
        price: 100,
        city: 'Sample City',
        rating: 4.5,
        guestCount: 100,
        locationValue: 'Sample Location',
        remaingPlaces: 50,
        zipcode: '12345'
    }

    it('renders calendar component', () => {
        render(
            <Calendar
                value={mockValue}
                onChange={mockOnChange}
                disabledDates={[]}
                // @ts-ignore
                event={mockEvent} // Provide the event property
            />
        )
        expect(screen.getByRole('application')).toBeInTheDocument()
    })
})