import { POST } from '@/app/api/events/route'
import { NextResponse } from 'next/server'
import prisma from '@/app/libs/prismadb'
import getCurrentUser from '@/app/actions/getCurrentUser'
import { GET } from "@/app/api/events/[listingId]/route"

jest.mock('@/app/libs/prismadb')
jest.mock('@/app/actions/getCurrentUser')

describe('Events API', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    describe('GET /api/events', () => {
        it('returns events list', async () => {
            const mockEvents = [
                { id: '1', title: 'Event 1' },
                { id: '2', title: 'Event 2' }
            ]

            ;(prisma.listing.findMany as jest.Mock).mockResolvedValue(mockEvents)

            const request = new Request('http://localhost')
            const params = { listingId: '1' }
            const response = await GET(request, { params })
            const data = await response.json()

            expect(data).toEqual(mockEvents)
        })
    })

    describe('POST /api/events', () => {
        const mockEventData = {
            title: 'New Event',
            description: 'Test Description',
            price: '100',
            category: 'test',
            location: { value: 'FR' },
            imageSrc: 'test.jpg',
            startDate: '2024-01-01',
            endDate: '2024-01-02',
            guestCount: 10,
            address: 'Test Address',
            city: 'Test City',
            zipcode: '12345'
        }

        it('creates new event when authenticated', async () => {
            const mockUser = { id: '1', email: 'test@test.com' }
            ;(getCurrentUser as jest.Mock).mockResolvedValue(mockUser)
            ;(prisma.listing.create as jest.Mock).mockResolvedValue({
                ...mockEventData,
                id: '1'
            })

            const response = await POST(new Request('http://localhost', {
                method: 'POST',
                body: JSON.stringify(mockEventData)
            }))

            expect(response.status).toBe(200)
            expect(prisma.listing.create).toHaveBeenCalled()
        })

        it('returns error when not authenticated', async () => {
            ;(getCurrentUser as jest.Mock).mockResolvedValue(null)

            const response = await POST(new Request('http://localhost', {
                method: 'POST',
                body: JSON.stringify(mockEventData)
            }))

            expect(response).toEqual(NextResponse.error())
        })
    })
})