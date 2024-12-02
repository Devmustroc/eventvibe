/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ImageUpload } from '@/app/components/input/ImageUpload';
import { vi, describe, it, expect, beforeEach } from 'vitest';

// Mock next/image
vi.mock('next/image', () => ({
    default: (props: any) => {
        // eslint-disable-next-line @next/next/no-img-element
        return <img {...props} alt={props.alt} />
    }
}));

// Mock next-cloudinary
vi.mock('next-cloudinary', () => ({
    CldUploadWidget: ({ children }: { children: any }) => {
        return children({ open: () => {} });
    }
}));

describe('ImageUpload', () => {
    const defaultProps = {
        onChange: vi.fn(),
        value: '',
    };

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders upload button and icon', () => {
        render(<ImageUpload {...defaultProps} />);
        
        expect(screen.getByText('Click to upload')).toBeInTheDocument();
        const icon = document.querySelector('svg');
        expect(icon).toBeInTheDocument();
    });

    it('shows preview image when value is provided', () => {
        const props = {
            ...defaultProps,
            value: 'https://example.com/test-image.jpg'
        };
        
        render(<ImageUpload {...props} />);
        
        const image = screen.getByAltText('House');
        expect(image).toBeInTheDocument();
        expect(image).toHaveAttribute('src', props.value);
    });

    it('applies correct styles to the container', () => {
        const { container } = render(<ImageUpload {...defaultProps} />);
        const uploadContainer = container.firstChild as HTMLElement;
        
        expect(uploadContainer).toHaveClass(
            'relative',
            'cursor-pointer',
            'hover:opacity-70',
            'transition',
            'border-dashed',
            'border-2',
            'p-20',
            'border-neutral-300',
            'flex',
            'flex-col',
            'justify-center',
            'items-center',
            'gap-4',
            'text-neutral-600'
        );
    });

    it('handles avatar prop styling', () => {
        const props = {
            ...defaultProps,
            avatar: true
        };
        
        render(<ImageUpload {...props} />);
        const uploadContainer = screen.getByText('Click to upload').parentElement;
        
        expect(uploadContainer).toHaveClass('relative', 'cursor-pointer');
    });
});