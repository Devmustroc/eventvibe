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
        it('returns events list successfully', async () => {
            const mockEvents = [
                { id: '1', title: 'Event 1' },
                { id: '2', title: 'Event 2' }
            ]

            ;(prisma.listing.findMany as jest.Mock).mockResolvedValue(mockEvents)

            const request = new Request('http://localhost')
            const params = { listingId: '1' }
            const response = await GET(request, { params })
            const data = await response.json()

            expect(response.status).toBe(200)
            expect(data).toEqual(mockEvents)
            expect(prisma.listing.findMany).toHaveBeenCalledTimes(1)
        })

        it('handles empty events list', async () => {
            ;(prisma.listing.findMany as jest.Mock).mockResolvedValue([])

            const request = new Request('http://localhost')
            const params = { listingId: '1' }
            const response = await GET(request, { params })
            const data = await response.json()

            expect(response.status).toBe(200)
            expect(data).toEqual([])
        })

        it('handles database error gracefully', async () => {
            ;(prisma.listing.findMany as jest.Mock).mockRejectedValue(new Error('Database error'))

            const request = new Request('http://localhost')
            const params = { listingId: '1' }
            const response = await GET(request, { params })

            expect(response.status).toBe(500)
            const data = await response.json()
            expect(data).toHaveProperty('error')
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
            ;(prisma.listing.create as jest.Mock).mockResolvedValue({ ...mockEventData, id: '1' })

            const request = new Request('http://localhost', {
                method: 'POST',
                body: JSON.stringify(mockEventData)
            })

            const response = await POST(request)
            const data = await response.json()

            expect(response.status).toBe(201)
            expect(data).toHaveProperty('id')
            expect(prisma.listing.create).toHaveBeenCalledWith({
                data: expect.objectContaining({
                    userId: mockUser.id,
                    title: mockEventData.title
                })
            })
        })

        it('rejects creation when user is not authenticated', async () => {
            ;(getCurrentUser as jest.Mock).mockResolvedValue(null)

            const request = new Request('http://localhost', {
                method: 'POST',
                body: JSON.stringify(mockEventData)
            })

            const response = await POST(request)
            expect(response.status).toBe(401)
            expect(prisma.listing.create).not.toHaveBeenCalled()
        })

        it('validates required fields', async () => {
            const mockUser = { id: '1', email: 'test@test.com' }
            ;(getCurrentUser as jest.Mock).mockResolvedValue(mockUser)

            const invalidEventData = {
                ...mockEventData,
                title: '', // titre vide
                price: '-100' // prix négatif
            }

            const request = new Request('http://localhost', {
                method: 'POST',
                body: JSON.stringify(invalidEventData)
            })

            const response = await POST(request)
            expect(response.status).toBe(400)
            expect(prisma.listing.create).not.toHaveBeenCalled()
        })

        it('handles database errors during creation', async () => {
            const mockUser = { id: '1', email: 'test@test.com' }
            ;(getCurrentUser as jest.Mock).mockResolvedValue(mockUser)
            ;(prisma.listing.create as jest.Mock).mockRejectedValue(new Error('Database error'))

            const request = new Request('http://localhost', {
                method: 'POST',
                body: JSON.stringify(mockEventData)
            })

            const response = await POST(request)
            expect(response.status).toBe(500)
            const data = await response.json()
            expect(data).toHaveProperty('error')
        })
    })
})