import { render, screen, fireEvent, within } from '@testing-library/react';
import { CountrySelect, CountrySelectValue } from '@/app/components/CountrySelect';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import useCountries from '@/app/hooks/useCountries';

// Mock the useCountries hook
vi.mock('@/app/hooks/useCountries', () => ({
    default: () => ({
        getAllCountries: () => [
            {
                flag: '🇫🇷',
                label: 'France',
                latlng: [46.227638, 2.213749],
                region: 'Europe',
                value: 'FR'
            },
            {
                flag: '🇺🇸',
                label: 'United States',
                latlng: [37.09024, -95.712891],
                region: 'Americas',
                value: 'US'
            }
        ]
    })
}));

describe('CountrySelect', () => {
    const mockOnChange = vi.fn();
    const mockValue: CountrySelectValue = {
        flag: '🇫🇷',
        label: 'France',
        latlng: [46.227638, 2.213749],
        region: 'Europe',
        value: 'FR'
    };

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders with placeholder when no value is selected', () => {
        render(<CountrySelect onChange={mockOnChange} />);
        expect(screen.getByText('Select Country')).toBeInTheDocument();
    });

    it('renders with selected value', () => {
        const { container } = render(<CountrySelect value={mockValue} onChange={mockOnChange} />);
        const selectContainer = container.firstChild as HTMLElement;
        
        expect(within(selectContainer).getByText(/France/)).toBeInTheDocument();
        expect(within(selectContainer).getByText(/Europe/)).toBeInTheDocument();
        expect(within(selectContainer).getByText('🇫🇷')).toBeInTheDocument();
    });

    it('displays all countries from the hook', async () => {
        const { container } = render(<CountrySelect onChange={mockOnChange} />);
        const selectContainer = container.firstChild as HTMLElement;
        
        // Open the select dropdown
        const selectElement = screen.getByRole('combobox');
        fireEvent.keyDown(selectElement, { key: 'ArrowDown' });
        
        // Check if both countries are in the list
        expect(within(selectContainer).getByText(/France/)).toBeInTheDocument();
        expect(within(selectContainer).getByText(/United States/)).toBeInTheDocument();
    });

    it('calls onChange when a country is selected', () => {
        const { container } = render(<CountrySelect onChange={mockOnChange} />);
        const selectContainer = container.firstChild as HTMLElement;
        
        // Open the select dropdown
        const selectElement = screen.getByRole('combobox');
        fireEvent.keyDown(selectElement, { key: 'ArrowDown' });
        
        // Select France option
        const option = within(selectContainer).getByText(/France/);
        fireEvent.click(option);
        
        expect(mockOnChange).toHaveBeenCalledWith(expect.objectContaining({
            label: 'France',
            value: 'FR'
        }));
    });

    it('renders with correct styling', () => {
        const { container } = render(<CountrySelect onChange={mockOnChange} />);
        
        // Check if the container has the correct width class
        expect(container.firstChild).toHaveClass('w-full');
    });
});