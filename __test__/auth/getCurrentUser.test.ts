import getCurrentUser from '@/app/actions/getCurrentUser'
import { getSession } from '@/app/actions/getCurrentUser'
import prisma from '@/app/libs/prismadb'

jest.mock('@/app/libs/prismadb')
jest.mock('next-auth')

describe('getCurrentUser', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    it('returns null if no session exists', async () => {
        ;(getSession as jest.Mock).mockResolvedValue(null)
        const result = await getCurrentUser()
        expect(result).toBeNull()
    })

    it('returns null if no user email in session', async () => {
        ;(getSession as jest.Mock).mockResolvedValue({ user: {} })
        const result = await getCurrentUser()
        expect(result).toBeNull()
    })

    it('returns formatted user data when user exists', async () => {
        const mockUser = {
                id: '1',
                email: 'test@test.com',
                name: 'Test User',
                createdAt: new Date(),
                updatedAt: new Date(),
                emailVerified: null,
                image: 'test.jpg'
            }

        ;(getSession as jest.Mock).mockResolvedValue({
            user: { email: 'test@test.com' }
        })
        ;(prisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser)

        const result = await getCurrentUser()
        expect(result).toEqual(expect.objectContaining({
            email: mockUser.email,
            name: mockUser.name
        }))
    })

    it('handles errors gracefully', async () => {
        ;(getSession as jest.Mock).mockRejectedValue(new Error('Test error'))
        const result = await getCurrentUser()
        expect(result).toBeNull()
    })
})
