import { getEvents } from '@/app/actions/getEvents'
import prisma from '@/app/libs/prismadb'

jest.mock('@/app/libs/prismadb', () => ({
    listing: {
        findMany: jest.fn()
    }
}))

describe('getEvents', () => {
    it('returns events with correct filters', async () => {
        const mockEvents = [
            {
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
        ];
        (prisma.listing.findMany as jest.Mock).mockResolvedValue(mockEvents)

        const result = await getEvents({
            category: 'test',
            city: 'Paris',
            guestCount: 2
        })

        expect(result).toEqual(mockEvents)
        expect(prisma.listing.findMany).toHaveBeenCalledWith(
            expect.objectContaining({
                where: expect.objectContaining({
                    category: 'test',
                    city: 'Paris',
                    guestCount: { gte: 2 }
                })
            })
        )
    })
})