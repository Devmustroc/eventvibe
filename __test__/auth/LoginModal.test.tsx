import { render, fireEvent, screen, waitFor } from '@testing-library/react'
import LoginModal from '@/app/components/modals/LoginModal'
import { signIn } from 'next-auth/react'
import { toast } from 'react-hot-toast'

jest.mock('next-auth/react')
jest.mock('react-hot-toast')

describe('LoginModal', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    it('renders login form correctly', () => {
        const { container } = render(<LoginModal />)
        console.log(container.innerHTML) // Add this line to inspect the rendered output
        expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
        expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
        expect(screen.getByRole('button', { name: /continue/i })).toBeInTheDocument()
    })

    it('handles successful login', async () => {
        ;(signIn as jest.Mock).mockResolvedValue({ ok: true })

        render(<LoginModal />)

        fireEvent.change(screen.getByLabelText(/email/i), {
            target: { value: 'test@test.com' }
        })
        fireEvent.change(screen.getByLabelText(/password/i), {
            target: { value: 'password123' }
        })
        fireEvent.click(screen.getByRole('button', { name: /continue/i }))

        await waitFor(() => {
            expect(toast.success).toHaveBeenCalledWith('Logged in')
        })
    })

    it('handles login failure', async () => {
        ;(signIn as jest.Mock).mockResolvedValue({
            error: 'Invalid credentials'
        })

        render(<LoginModal />)

        fireEvent.change(screen.getByLabelText(/email/i), {
            target: { value: 'test@test.com' }
        })
        fireEvent.change(screen.getByLabelText(/password/i), {
            target: { value: 'wrongpassword' }
        })
        fireEvent.click(screen.getByRole('button', { name: /continue/i }))

        await waitFor(() => {
            expect(toast.error).toHaveBeenCalledWith('Invalid credentials')
        })
    })
})