import { render, screen, fireEvent } from '@testing-library/react';
import MenuItem from '@/app/components/navbar/MenuItem';
import { describe, it, expect, vi } from 'vitest';

describe('MenuItem', () => {
    const defaultProps = {
        label: 'Test Item',
        onClick: vi.fn()
    };

    it('renders with the correct label', () => {
        render(<MenuItem {...defaultProps} />);
        expect(screen.getByText(defaultProps.label)).toBeInTheDocument();
    });

    it('calls onClick when clicked', () => {
        render(<MenuItem {...defaultProps} />);
        const menuItem = screen.getByText(defaultProps.label);
        fireEvent.click(menuItem);
        expect(defaultProps.onClick).toHaveBeenCalledTimes(1);
    });

    it('has correct default styling', () => {
        render(<MenuItem {...defaultProps} />);
        const menuItem = screen.getByText(defaultProps.label).closest('div');
        expect(menuItem).not.toBeNull();
        const className = menuItem?.className || '';
        
        expect(className).toContain('px-4');
        expect(className).toContain('py-3');
        expect(className).toContain('text-sm');
        expect(className).toContain('hover:bg-brand_gray');
        expect(className).toContain('hover:text-white');
        expect(className).toContain('transition');
        expect(className).toContain('font-semibold');
    });

    it('renders as a div element', () => {
        render(<MenuItem {...defaultProps} />);
        const menuItem = screen.getByText(defaultProps.label).closest('div');
        expect(menuItem?.tagName).toBe('DIV');
    });
});