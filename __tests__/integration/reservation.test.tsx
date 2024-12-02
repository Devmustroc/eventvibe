import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, test, expect, vi } from 'vitest'
import ReservationClient from '@/app/reservations/ReservationClient'

// Mock des données de réservation
const mockReservation = {
  id: 'res1',
  userId: 'user1',
  eventId: 'event1',
  startDate: new Date(),
  endDate: new Date(),
  totalPrice: 100,
  createdAt: new Date()
}

// Mock des données d'événement
const mockEvent = {
  id: 'event1',
  title: 'Test Event',
  description: 'Test Description',
  imageSrc: 'test.jpg',
  createdAt: new Date(),
  category: 'test',
  locationValue: 'FR', // Ajout de la valeur de localisation
  price: 100,
  userId: 'user1'
}

// Mock des données utilisateur
const mockCurrentUser = {
  id: 'user1',
  name: 'Test User',
  email: 'test@example.com',
  emailVerified: null,
  image: null,
  hashedPassword: null,
  createdAt: new Date(),
  updatedAt: new Date(),
  favoriteIds: []
}

// Mock de la fonction de suppression
const mockDeleteReservation = vi.fn()

describe('ReservationClient Integration', () => {
  test('displays reservations and allows cancellation', async () => {
    render(
      <ReservationClient
        reservations={[{ ...mockReservation, event: mockEvent }]}
        currentUser={mockCurrentUser}
        onAction={mockDeleteReservation}
      />
    )

    // Vérifie que la réservation est affichée
    expect(screen.getByText('Test Event')).toBeInTheDocument()

    // Clique sur le bouton d'annulation
    const cancelButton = screen.getByRole('button', { name: /cancel/i })
    fireEvent.click(cancelButton)

    // Vérifie que la fonction de suppression a été appelée
    expect(mockDeleteReservation).toHaveBeenCalledWith('res1')
  })

  test('handles error during cancellation', async () => {
    // Mock de la fonction de suppression qui échoue
    const mockDeleteWithError = vi.fn().mockRejectedValue(new Error('Failed to cancel'))

    render(
      <ReservationClient
        reservations={[{ ...mockReservation, event: mockEvent }]}
        currentUser={mockCurrentUser}
        onAction={mockDeleteWithError}
      />
    )

    // Clique sur le bouton d'annulation
    const cancelButton = screen.getByRole('button', { name: /cancel/i })
    fireEvent.click(cancelButton)

    // Vérifie que la fonction d'erreur a été appelée
    await waitFor(() => {
      expect(mockDeleteWithError).toHaveBeenCalledWith('res1')
    })
  })
})
