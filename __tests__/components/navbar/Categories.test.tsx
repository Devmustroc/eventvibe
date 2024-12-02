import { render, screen } from '@testing-library/react';
import Categories, { categories } from '@/app/components/navbar/Categories';
import { usePathname, useSearchParams } from 'next/navigation';
import { vi, describe, it, beforeEach, expect } from 'vitest';

// Mock next/navigation
vi.mock('next/navigation', () => ({
    useSearchParams: vi.fn(),
    usePathname: vi.fn()
}));

// Mock the Container component
vi.mock('@/app/components/Container', () => ({
    Container: ({ children }: { children: React.ReactNode }) => <div data-testid="container">{children}</div>,
}));

// Mock CategoryBox component
vi.mock('@/app/components/CategoryBox', () => ({
    default: ({ label, selected }: { label: string; selected: boolean }) => (
        <div data-testid={`category-${label}`} data-selected={selected}>{label}</div>
    )
}));

describe('Categories', () => {
    const mockUseSearchParams = useSearchParams as unknown as ReturnType<typeof vi.fn>;
    const mockUsePathname = usePathname as unknown as ReturnType<typeof vi.fn>;

    beforeEach(() => {
        // Reset all mocks before each test
        vi.clearAllMocks();
        mockUseSearchParams.mockReturnValue(new URLSearchParams());
        mockUsePathname.mockReturnValue('/');
    });

    it('renders all categories when on main page', () => {
        mockUsePathname.mockReturnValue('/');
        render(<Categories />);
        
        categories.forEach(category => {
            expect(screen.getByTestId(`category-${category.label}`)).toBeInTheDocument();
        });
    });

    it('does not render when not on main page', () => {
        mockUsePathname.mockReturnValue('/some-other-page');
        const { container } = render(<Categories />);
        
        expect(container).toBeEmptyDOMElement();
    });

    it('marks the selected category based on URL parameter', () => {
        const selectedCategory = 'Dance';
        mockUseSearchParams.mockReturnValue(new URLSearchParams(`category=${selectedCategory}`));
        mockUsePathname.mockReturnValue('/');
        
        render(<Categories />);
        
        const selectedElement = screen.getByTestId(`category-${selectedCategory}`);
        expect(selectedElement).toHaveAttribute('data-selected', 'true');
        
        // Check that other categories are not selected
        categories
            .filter(cat => cat.label !== selectedCategory)
            .forEach(category => {
                const element = screen.getByTestId(`category-${category.label}`);
                expect(element).toHaveAttribute('data-selected', 'false');
            });
    });

    it('renders within a Container component', () => {
        mockUsePathname.mockReturnValue('/');
        render(<Categories />);
        
        expect(screen.getByTestId('container')).toBeInTheDocument();
    });

    it('renders with correct styling classes', () => {
        mockUsePathname.mockReturnValue('/');
        render(<Categories />);
        
        const categoriesContainer = screen.getByTestId('container').firstChild as HTMLElement;
        expect(categoriesContainer.className).toContain('pt-4');
        expect(categoriesContainer.className).toContain('flex');
        expect(categoriesContainer.className).toContain('flex-row');
        expect(categoriesContainer.className).toContain('items-center');
        expect(categoriesContainer.className).toContain('justify-center');
        expect(categoriesContainer.className).toContain('overflow-x-scroll');
        expect(categoriesContainer.className).toContain('whitespace-nowrap');
        expect(categoriesContainer.className).toContain('scrollbar-hide');
        expect(categoriesContainer.className).toContain('relative');
        expect(categoriesContainer.className).toContain('gap-4');
    });
});