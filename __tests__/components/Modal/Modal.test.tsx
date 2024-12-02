import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Modal from '@/app/components/modals/Modal';
import '@testing-library/jest-dom';

vi.useFakeTimers();

describe('Modal Component', () => {
  const mockOnClose = vi.fn();
  const mockOnSubmit = vi.fn();
  const mockSecondaryAction = vi.fn();

  const defaultProps = {
    isOpen: true,
    onClose: mockOnClose,
    onSubmit: mockOnSubmit,
    title: 'Test Modal',
    body: <div>Test Body</div>,
    actionLabel: 'Submit',
    secondaryAction: mockSecondaryAction,
    secondaryActionLabel: 'Cancel'
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders nothing when isOpen is false', () => {
    render(<Modal {...defaultProps} isOpen={false} />);
    expect(screen.queryByText('Test Modal')).not.toBeInTheDocument();
  });

  it('renders modal content when isOpen is true', () => {
    render(<Modal {...defaultProps} />);
    expect(screen.getByText('Test Modal')).toBeInTheDocument();
    expect(screen.getByText('Test Body')).toBeInTheDocument();
    expect(screen.getByText('Submit')).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
  });

  it('calls onSubmit when submit button is clicked', () => {
    render(<Modal {...defaultProps} />);
    fireEvent.click(screen.getByText('Submit'));
    expect(mockOnSubmit).toHaveBeenCalledTimes(1);
  });

  it('calls secondaryAction when secondary button is clicked', () => {
    render(<Modal {...defaultProps} />);
    fireEvent.click(screen.getByText('Cancel'));
    expect(mockSecondaryAction).toHaveBeenCalledTimes(1);
  });

  it('does not call actions when disabled is true', () => {
    render(<Modal {...defaultProps} disabled={true} />);
    
    fireEvent.click(screen.getByText('Submit'));
    expect(mockOnSubmit).not.toHaveBeenCalled();

    fireEvent.click(screen.getByText('Cancel'));
    expect(mockSecondaryAction).not.toHaveBeenCalled();
  });
});