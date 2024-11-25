import '@testing-library/jest-dom'
import 'whatwg-fetch'

// Mock next/navigation
jest.mock('next/navigation', () => ({
    useRouter() {
        return {
            push: jest.fn(),
            refresh: jest.fn(),
        }
    },
    useSearchParams() {
        return new URLSearchParams()
    }
}))

// Mock next-auth
jest.mock('next-auth/react', () => ({
    useSession: jest.fn(() => ({ data: null, status: 'unauthenticated' })),
    signIn: jest.fn(),
    signOut: jest.fn(),
}))