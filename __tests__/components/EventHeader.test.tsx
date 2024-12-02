import React from 'react';
import { render, screen } from '../test-utils';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom';
import { EventHeader } from '@/app/components/events/EventHeader';

// Mock the next/image component
vi.mock('next/image', () => ({
  default: (props: any) => <img {...props} />
}));

// Mock the useCountries hook
vi.mock('@/app/hooks/useCountries', () => ({
  default: () => ({
    getByValue: () => ({
      label: 'France',
      region: 'Europe'
    })
  })
}));

// Mock the HeartButton component
vi.mock('@/app/components/HeartButton', () => ({
  HeartButton: () => <button data-testid="heart-button">Like</button>
}));

describe('EventHeader', () => {
  const mockProps = {
    title: 'Test Event',
    imageSrc: '/test-image.jpg',
    locationValue: 'FR',
    id: '123',
    currentUser: null
  };

  it('renders the event title', () => {
    render(<EventHeader {...mockProps} />);
    expect(screen.getByText('Test Event')).toBeInTheDocument();
  });

  it('renders the event image', () => {
    render(<EventHeader {...mockProps} />);
    const image = screen.getByAltText('event image');
    expect(image).toBeInTheDocument();
  });

  it('renders the HeartButton', () => {
    render(<EventHeader {...mockProps} />);
    expect(screen.getByTestId('heart-button')).toBeInTheDocument();
  });
});