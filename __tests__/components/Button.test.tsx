import React from 'react';
import { render, screen } from '../test-utils';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import Button from '../../app/components/Button';

// Import test setup
import '../setup';

describe('Button', () => {
  it('renders correctly with basic props', () => {
    const mockOnClick = vi.fn();
    const { getByRole } = render(<Button label="Test Button" onClick={mockOnClick} />);
    const button = getByRole('button', { name: 'Test Button' });
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Test Button');
  });

  it('handles click events', async () => {
    const mockOnClick = vi.fn();
    const { getByRole } = render(<Button label="Click Me" onClick={mockOnClick} />);
    const button = getByRole('button', { name: 'Click Me' });
    await userEvent.click(button);
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it('applies disabled state correctly', () => {
    const mockOnClick = vi.fn();
    const { getByRole } = render(
      <Button label="Disabled Button" onClick={mockOnClick} disabled />
    );
    const button = getByRole('button', { name: 'Disabled Button' });
    expect(button).toBeDisabled();
  });
});