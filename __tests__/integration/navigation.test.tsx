import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, test, expect, beforeEach, vi } from 'vitest'
import { NavBar } from '@/app/components/navbar/NavBar'
import { useRouter } from 'next/navigation'

// Mock next/navigation
const mockRouter = {
  push: vi.fn(),
  refresh: vi.fn(),
  back: vi.fn(),
  forward: vi.fn()
}

vi.mock('next/navigation', () => ({
  useRouter: () => mockRouter
}))

// Mock next-auth
vi.mock('next-auth/react', () => ({
  signOut: vi.fn(() => Promise.resolve()),
  useSession: vi.fn(() => ({
    data: null,
    status: 'unauthenticated'
  }))
}))

// Mock des données utilisateur
const mockUser = {
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

describe('Navigation Integration', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    
    render(
      <div>
        <NavBar currentUser={mockUser} />
      </div>
    )
  })

  test('user menu interaction', async () => {
    // On cherche le bouton du menu utilisateur par son data-testid
    const menuButton = screen.getByTestId('user-menu-button')
    expect(menuButton).toBeInTheDocument()
    
    // Click sur le menu
    fireEvent.click(menuButton)

    // Vérification que les options du menu sont affichées
    await waitFor(() => {
      expect(screen.getByTestId('profile-link')).toBeInTheDocument()
      expect(screen.getByTestId('events-link')).toBeInTheDocument()
      expect(screen.getByTestId('logout-button')).toBeInTheDocument()
    })
  })

  test('navigation links', async () => {
    // Test du lien vers la page d'accueil via le logo
    const logo = screen.getByTestId('logo-link')
    fireEvent.click(logo)
    expect(mockRouter.push).toHaveBeenCalledWith('/')

    // Test du bouton de création d'événement
    const createButton = screen.getByTestId('create-event-button')
    fireEvent.click(createButton)
    expect(mockRouter.push).toHaveBeenCalledWith('/events/create')
  })

  test('search functionality', async () => {
    // Test de la recherche
    const searchInput = screen.getByTestId('search-input')
    fireEvent.change(searchInput, { target: { value: 'Concert' } })
    
    // Simulation de la soumission de recherche
    const searchForm = screen.getByTestId('search-form')
    fireEvent.submit(searchForm)
    
    // Vérification que la navigation a été appelée avec les bons paramètres
    expect(mockRouter.push).toHaveBeenCalledWith('/search?query=Concert')
  })
})
