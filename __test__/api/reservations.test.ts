import { DELETE } from '@/app/api/reservations/[reservationId]/route'
import prisma from '@/app/libs/prismadb'
import getCurrentUser from '@/app/actions/getCurrentUser'

jest.mock('@/app/libs/prismadb')
jest.mock('@/app/actions/getCurrentUser')

describe('Reservations API', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    describe('POST /api/reservations', () => {
        const mockReservationData = {
            eventId: '1',
            startDate: '2024-01-01',
            endDate: '2024-01-02',
            totalPrice: 100,
            numGuests: 2
        }

    })

    describe('DELETE /api/reservations/:id', () => {
        it('deletes reservation when authorized', async () => {
            const mockUser = { id: '1' }
            ;(getCurrentUser as jest.Mock).mockResolvedValue(mockUser)
            ;(prisma.reservation.delete as jest.Mock).mockResolvedValue({})

            const response = await DELETE(
                new Request('http://localhost'),
                { params: { reservationId: '1' } }
            )

            expect(response.status).toBe(200)
            expect(prisma.reservation.delete).toHaveBeenCalled()
        })
    })
})