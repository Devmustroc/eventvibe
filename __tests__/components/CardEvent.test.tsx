import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { CardEvent } from '@/app/components/events/CardEvent';

// Mock next/navigation
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn()
  })
}));

// Mock useCountries hook
vi.mock('@/app/hooks/useCountries', () => ({
  default: () => ({
    getByValue: () => ({
      value: 'FR',
      label: 'France',
      flag: '🇫🇷',
      latlng: [46.227638, 2.213749],
      region: 'Europe'
    })
  })
}));

// Mock AvatarMatchList component
vi.mock('@/app/components/AvatarMatchList', () => ({
  AvatarMatchList: () => <div data-testid="avatar-match-list">Avatar List</div>
}));

describe('CardEvent', () => {
  const mockEvent = {
    id: '1',
    title: 'Test Event',
    description: 'Test Description',
    imageSrc: '/test-image.jpg',
    createdAt: new Date(),
    category: 'test',
    locationValue: 'FR',
    city: 'Paris',
    userId: '1',
    price: 100,
    startDate: new Date('2024-01-01'),
    endDate: new Date('2024-01-02'),
    userMatch: []
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders event card with basic information', () => {
    render(<CardEvent event={mockEvent} currentUser={null} />);
    expect(screen.getByTestId('event-title')).toHaveTextContent(mockEvent.title);
    expect(screen.getByTestId('event-description')).toHaveTextContent(mockEvent.description);
  });

  it('displays event image', () => {
    render(<CardEvent event={mockEvent} currentUser={null} />);
    const image = screen.getByTestId('event-image') as HTMLImageElement;
    expect(image).toBeInTheDocument();
  });
});