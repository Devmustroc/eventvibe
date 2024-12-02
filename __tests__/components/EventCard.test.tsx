import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { EventCard } from '../../app/components/events/EventCard';
import { useRouter } from 'next/navigation';

// Mock the next/navigation module
vi.mock('next/navigation', () => ({
  useRouter: vi.fn(() => ({
    push: vi.fn()
  }))
}));

// Mock the useCountries hook
vi.mock('../../app/hooks/useCountries', () => ({
  default: () => ({
    getByValue: () => ({
      label: 'Test Country',
      region: 'Test Region'
    })
  })
}));

describe('EventCard', () => {
  const mockEvent = {
    id: '1',
    title: 'Test Event',
    description: 'Test Description',
    imageSrc: '/test-image.jpg',
    createdAt: new Date(),
    category: 'test',
    locationValue: 'FR',
    userId: '1',
    price: 100,
    startDate: new Date('2024-01-01'),
    endDate: new Date('2024-01-02')
  };

  const mockRouter = {
    push: vi.fn()
  };

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders event card with basic information', () => {
    render(<EventCard event={mockEvent} />);
    expect(screen.getByText('Test Event...')).toBeInTheDocument();
  });

  it('renders event price', () => {
    render(<EventCard event={mockEvent} />);
    expect(screen.getByText('100 €')).toBeInTheDocument();
  });
});