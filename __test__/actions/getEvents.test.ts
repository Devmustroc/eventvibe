import getEvents from '@/app/actions/getEvents';
import prisma from '@/app/libs/prismadb';

jest.mock('@/app/libs/prismadb', () => ({
    event: {
        findMany: jest.fn()
    }
}));

describe('getEvents', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('returns events with correct filters', async () => {
        const mockEvents = [{
            id: '1',
            title: 'Test Event',
            description: 'Test Description',
            imageSrc: 'test.jpg',
            createdAt: new Date('2023-01-01'),
            category: 'music',
            locationValue: 'FR',
            price: 100,
            organizerId: 'user1'
        }];

        (prisma.event.findMany as jest.Mock).mockResolvedValue(mockEvents);

        const result = await getEvents({
            organizerId: 'user1',
            category: 'music',
            locationValue: 'FR'
        });

        expect(result).toEqual(mockEvents);
        expect(prisma.event.findMany).toHaveBeenCalledWith({
            where: {
                organizerId: 'user1',
                category: 'music',
                locationValue: 'FR'
            },
            orderBy: {
                createdAt: 'desc'
            }
        });
    });
});