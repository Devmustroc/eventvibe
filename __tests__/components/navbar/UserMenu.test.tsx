import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import UserMenu from '@/app/components/navbar/UserMenu';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { signOut } from 'next-auth/react';
import { SafeUser } from '@/app/types';

// Mock next/navigation
vi.mock('next/navigation', () => ({
    useRouter: () => ({
        push: vi.fn()
    })
}));

// Mock next-auth/react
vi.mock('next-auth/react', () => ({
    signOut: vi.fn(() => Promise.resolve())
}));

// Mock react-hot-toast
vi.mock('react-hot-toast', () => ({
    default: {
        success: vi.fn()
    }
}));

// Mock the hooks
vi.mock('@/app/hooks/useLoginModal', () => ({
    default: () => ({
        onOpen: vi.fn()
    })
}));

vi.mock('@/app/hooks/useRentModal', () => ({
    default: () => ({
        onOpen: vi.fn()
    })
}));

// Mock Avatar component
vi.mock('@/app/components/Avatar', () => ({
    default: ({ src }: { src?: string }) => <div data-testid="avatar">Avatar</div>
}));

// Mock MenuItem component
vi.mock('@/app/components/navbar/MenuItem', () => ({
    default: ({ label, onClick }: { label: string; onClick: () => void }) => (
        <button onClick={onClick} data-testid={`menu-item-${label.toLowerCase().replace(/\s+/g, '-')}`}>
            {label}
        </button>
    )
}));

describe('UserMenu', () => {
    const mockUser: SafeUser = {
        id: '1',
        name: 'Test User',
        email: 'test@test.com',
        emailVerified: new Date(),
        image: 'test.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
        favoriteIds: []
    };

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders user menu button with avatar when not logged in', () => {
        render(<UserMenu />);
        expect(screen.getByTestId('avatar')).toBeInTheDocument();
    });

    it('renders user menu button with name when logged in', () => {
        render(<UserMenu currentUser={mockUser} />);
        expect(screen.getByText(mockUser.name)).toBeInTheDocument();
    });

    it('shows create event button when logged in', () => {
        render(<UserMenu currentUser={mockUser} />);
        const createButton = screen.getByTestId('create-event-button');
        expect(createButton).toBeInTheDocument();
    });

    it('does not show create event button when not logged in', () => {
        render(<UserMenu />);
        const createButton = screen.queryByTestId('create-event-button');
        expect(createButton).not.toBeInTheDocument();
    });

    it('opens menu when clicking the menu button', () => {
        render(<UserMenu currentUser={mockUser} />);
        const menuButton = screen.getByTestId('user-menu-button');
        fireEvent.click(menuButton);
        
        // Check if menu items are visible
        expect(screen.getByTestId('profile-link')).toBeInTheDocument();
        expect(screen.getByTestId('events-link')).toBeInTheDocument();
        expect(screen.getByTestId('logout-button')).toBeInTheDocument();
    });

    it('shows login option when not logged in', () => {
        render(<UserMenu />);
        const menuButton = screen.getByTestId('user-menu-button');
        fireEvent.click(menuButton);
        
        expect(screen.getByTestId('login-button')).toBeInTheDocument();
        expect(screen.getByTestId('register-button')).toBeInTheDocument();
    });

    it('handles logout correctly', async () => {
        render(<UserMenu currentUser={mockUser} />);
        const menuButton = screen.getByTestId('user-menu-button');
        fireEvent.click(menuButton);
        
        const logoutButton = await screen.findByTestId('logout-button');
        fireEvent.click(logoutButton);
        
        await waitFor(() => {
            expect(signOut).toHaveBeenCalled();
        });
    });

    it('closes menu when clicking outside', () => {
        render(<UserMenu currentUser={mockUser} />);
        const menuButton = screen.getByTestId('user-menu-button');
        fireEvent.click(menuButton);
        
        // Menu items should be visible
        expect(screen.getByTestId('profile-link')).toBeInTheDocument();
        
        // Click outside
        fireEvent.mouseDown(document.body);
        
        // Menu items should not be visible
        expect(screen.queryByTestId('profile-link')).not.toBeInTheDocument();
    });

    it('applies correct styling based on scroll prop', () => {
        const { rerender } = render(<UserMenu currentUser={mockUser} />);
        let menuButton = screen.getByTestId('user-menu-button');
        expect(menuButton.className).toContain('bg-white');
        
        rerender(<UserMenu currentUser={mockUser} scroll={true} />);
        menuButton = screen.getByTestId('user-menu-button');
        expect(menuButton.className).toContain('bg-transparent');
    });
});