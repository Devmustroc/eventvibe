import { render, screen } from '@testing-library/react';
import { EventInfo } from '@/app/components/events/EventInfo';
import { vi } from 'vitest';

// Mock the dynamic import of Map component
vi.mock('next/dynamic', () => ({
  default: () => function DynamicComponent() {
    return <div data-testid="map">Map Component</div>;
  }
}));

// Mock the useCountries hook
vi.mock('@/app/hooks/useCountries', () => ({
  default: () => ({
    getByValue: () => ({
      latlng: [51.505, -0.09]
    })
  })
}));

// Mock Avatar component
vi.mock('@/app/components/Avatar', () => ({
  default: () => <div data-testid="avatar">Avatar Component</div>
}));

// Mock AvatarMatchList component
vi.mock('@/app/components/AvatarMatchList', () => ({
  AvatarMatchList: () => <div data-testid="avatar-match-list">Avatar Match List</div>
}));

const mockUser = {
  id: '1',
  name: 'John Doe',
  email: 'john@example.com',
  emailVerified: new Date(),
  image: '/images/test-image.jpg',  
  createdAt: new Date(),
  updatedAt: new Date(),
  favoriteIds: []
};

const mockCategory = {
  label: 'Test Category',
  description: 'Test Description',
  icon: () => <div>Icon</div>
};

const defaultProps = {
  user: mockUser,
  description: 'Test Description',
  guestCount: 5,
  remainingPlaces: 3,
  locationValue: 'GB',
  category: mockCategory,
  address: 'Test Address',
  zipcode: '12345',
  city: 'Test City',
  userMatch: [mockUser],
  endDate: new Date(),
  startDate: new Date(),
  rating: 0,
  currentUser: null
};

describe('EventInfo', () => {
  it('renders host information correctly', () => {
    render(<EventInfo {...defaultProps} />);
    expect(screen.getByText(/Hosted by John Doe/)).toBeInTheDocument();
  });

  it('renders attendee count and remaining places', () => {
    render(<EventInfo {...defaultProps} />);
    expect(screen.getByText(/5 Attendees/)).toBeInTheDocument();
    expect(screen.getByText(/3 Places Remaining/)).toBeInTheDocument();
  });

  it('renders category information when provided', () => {
    render(<EventInfo {...defaultProps} />);
    const categoryTitle = screen.getByText('Test Category');
    const categoryContainer = categoryTitle.closest('.flex.flex-col.gap-2');
    const categoryDescription = categoryContainer?.querySelector('.text-gray-400.font-light');
    expect(categoryTitle).toBeInTheDocument();
    expect(categoryDescription?.textContent).toBe('Test Description');
  });

  it('renders location information correctly', () => {
    render(<EventInfo {...defaultProps} />);
    expect(screen.getByText('Test Address')).toBeInTheDocument();
    expect(screen.getByText('12345 Test City')).toBeInTheDocument();
  });

  it('renders map component', () => {
    render(<EventInfo {...defaultProps} />);
    expect(screen.getByTestId('map')).toBeInTheDocument();
  });

  it('does not render remaining places when undefined', () => {
    const propsWithoutRemaining = {
      ...defaultProps,
      remainingPlaces: undefined
    };
    render(<EventInfo {...propsWithoutRemaining} />);
    expect(screen.queryByText(/Places Remaining/)).not.toBeInTheDocument();
  });

  it('does not render category when not provided', () => {
    const propsWithoutCategory = {
      ...defaultProps,
      category: undefined
    };
    render(<EventInfo {...propsWithoutCategory} />);
    expect(screen.queryByText('Test Category')).not.toBeInTheDocument();
  });

  it('renders avatar components', () => {
    render(<EventInfo {...defaultProps} />);
    expect(screen.getByTestId('avatar')).toBeInTheDocument();
    expect(screen.getByTestId('avatar-match-list')).toBeInTheDocument();
  });
});