import { render, screen, fireEvent } from '@testing-library/react';
import { HeartButton } from '@/app/components/HeartButton';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import useFavorite from '@/app/hooks/useFavorite';

// Mock the useFavorite hook
vi.mock('@/app/hooks/useFavorite', () => ({
    default: vi.fn(() => ({
        hasFavorite: false,
        toggleFavorite: vi.fn()
    }))
}));

// Mock next/navigation
vi.mock('next/navigation', () => ({
    useRouter: vi.fn(() => ({
        refresh: vi.fn()
    }))
}));

describe('HeartButton', () => {
    const mockOrganizerId = 'test-organizer-123';
    const mockCurrentUser = {
        id: 'user-123',
        name: 'Test User',
        email: 'test@example.com',
        emailVerified: null,
        image: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        favoriteIds: []
    };

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders heart button with unfavorited state', () => {
        (useFavorite as any).mockImplementation(() => ({
            hasFavorite: false,
            toggleFavorite: vi.fn()
        }));

        render(<HeartButton organizerId={mockOrganizerId} currentUser={mockCurrentUser} />);
        
        const heartOutline = screen.getByTestId('heart-outline');
        const heartFill = screen.getByTestId('heart-fill');
        
        expect(heartOutline).toBeVisible();
        expect(heartFill).toHaveClass('hidden');
    });

    it('renders heart button with favorited state', () => {
        (useFavorite as any).mockImplementation(() => ({
            hasFavorite: true,
            toggleFavorite: vi.fn()
        }));

        render(<HeartButton organizerId={mockOrganizerId} currentUser={mockCurrentUser} />);
        
        const heartOutline = screen.getByTestId('heart-outline');
        const heartFill = screen.getByTestId('heart-fill');
        
        expect(heartOutline).toBeVisible();
        expect(heartFill).toHaveClass('block');
        expect(heartFill).toHaveClass('fill-red-600');
    });

    it('calls toggleFavorite when clicked', () => {
        const mockToggleFavorite = vi.fn();
        (useFavorite as any).mockImplementation(() => ({
            hasFavorite: false,
            toggleFavorite: mockToggleFavorite
        }));

        render(<HeartButton organizerId={mockOrganizerId} currentUser={mockCurrentUser} />);
        
        const button = screen.getByRole('button');
        fireEvent.click(button);
        
        expect(mockToggleFavorite).toHaveBeenCalledTimes(1);
    });

    it('renders correctly without current user', () => {
        (useFavorite as any).mockImplementation(() => ({
            hasFavorite: false,
            toggleFavorite: vi.fn()
        }));

        render(<HeartButton organizerId={mockOrganizerId} />);
        
        const heartOutline = screen.getByTestId('heart-outline');
        const heartFill = screen.getByTestId('heart-fill');
        
        expect(heartOutline).toBeVisible();
        expect(heartFill).toHaveClass('hidden');
    });
});