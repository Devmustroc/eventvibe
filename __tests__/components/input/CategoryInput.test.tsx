/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { CategoryInput } from '@/app/components/input/CategoryInput';
import { FaMusic } from 'react-icons/fa';
import { vi, describe, it, expect } from 'vitest';

describe('CategoryInput', () => {
    const defaultProps = {
        icon: FaMusic,
        label: 'Music',
        onClick: vi.fn()
    };

    it('renders the component with label and icon', () => {
        render(<CategoryInput {...defaultProps} />);
        
        // Vérifier que le label est présent
        expect(screen.getByText('Music')).toBeInTheDocument();
        
        // Vérifier que l'icône est présent (via le SVG)
        const icon = document.querySelector('svg');
        expect(icon).toBeInTheDocument();
    });

    it('calls onClick handler with label when clicked', () => {
        render(<CategoryInput {...defaultProps} />);
        
        const container = screen.getByText('Music').parentElement;
        fireEvent.click(container!);
        
        expect(defaultProps.onClick).toHaveBeenCalledWith('Music');
    });

    it('applies correct default styles when not selected', () => {
        const { container } = render(<CategoryInput {...defaultProps} />);
        const element = container.firstChild as HTMLElement;
        
        expect(element).toHaveClass(
            'rounded-xl',
            'border-2',
            'border-brand_gray',
            'p-4',
            'flex',
            'gap-3',
            'items-center',
            'cursor-pointer'
        );
        
        expect(element).toHaveClass('border-brand_secondary/70');
        expect(element).toHaveClass('text-brand_secondary');
    });

    it('applies correct styles when selected', () => {
        const { container } = render(<CategoryInput {...defaultProps} selected={true} />);
        const element = container.firstChild as HTMLElement;
        
        expect(element).toHaveClass('border-brand_primary/70');
        expect(element).toHaveClass('text-brand_secondary');
        expect(element).toHaveClass('justify-center');
    });

    it('applies hover styles correctly', () => {
        const { container } = render(<CategoryInput {...defaultProps} />);
        const element = container.firstChild as HTMLElement;
        
        expect(element).toHaveClass(
            'hover:border-brand_secondary/70',
            'hover:justify-center',
            'hover:transition',
            'hover:duration-200'
        );
    });
});