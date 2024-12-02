/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Calendar from '@/app/components/input/Calendar';
import { addDays } from 'date-fns';
import { vi, describe, it, expect, beforeEach } from 'vitest';

vi.mock('react-date-range', () => ({
    DateRange: vi.fn(({ onChange, minDate, maxDate }) => (
        <div data-testid="mock-date-range">
            <div data-testid="date-constraints">
                <span data-testid="min-date">{minDate?.toISOString()}</span>
                <span data-testid="max-date">{maxDate?.toISOString()}</span>
            </div>
            <button 
                onClick={() => onChange({ 
                    selection: { 
                        startDate: new Date('2024-01-01'), 
                        endDate: new Date('2024-01-05') 
                    } 
                })}
            >
                Select Date Range
            </button>
        </div>
    ))
}));

describe('Calendar', () => {
    const mockEvent = {
        id: '1',
        title: 'Test Event',
        description: 'Test Description',
        imageSrc: 'test.jpg',
        startDate: '2024-01-01',
        endDate: '2024-01-31',
        price: 100,
        location: 'Test Location',
        category: 'Test Category',
        userId: '1',
        createdAt: new Date(),
    };

    const defaultProps = {
        value: {
            startDate: new Date(),
            endDate: addDays(new Date(), 5),
            key: 'selection'
        },
        onChange: vi.fn(),
        event: mockEvent
    };

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders the calendar component', () => {
        render(<Calendar {...defaultProps} />);
        expect(screen.getByTestId('mock-date-range')).toBeInTheDocument();
    });

    it('applies correct styling classes', () => {
        const { container } = render(<Calendar {...defaultProps} />);
        const mainDiv = container.firstChild as HTMLElement;
        expect(mainDiv).toHaveClass(
            'w-full',
            'bg-white',
            'rounded-l',
            'border-[1px]',
            'border-neutral-100',
            'shadow-[5px_5px_10px_#bdcbc4]',
            'overflow-hidden'
        );
    });

    it('calls onChange when date range is selected', () => {
        render(<Calendar {...defaultProps} />);
        
        const selectButton = screen.getByText('Select Date Range');
        fireEvent.click(selectButton);

        expect(defaultProps.onChange).toHaveBeenCalledWith({
            selection: {
                startDate: new Date('2024-01-01'),
                endDate: new Date('2024-01-05')
            }
        });
    });

    it('passes correct date constraints to DateRange', () => {
        render(<Calendar {...defaultProps} />);
        const minDateEl = screen.getByTestId('min-date');
        const maxDateEl = screen.getByTestId('max-date');
        
        expect(minDateEl.textContent).toBe(new Date(mockEvent.startDate).toISOString());
        expect(maxDateEl.textContent).toBe(new Date(mockEvent.endDate).toISOString());
    });
});