import { render, screen } from '@testing-library/react'
import FavoritesPage from '@/app/favorites/page'
import getFavoriteEvents from '@/app/actions/getFavoriteEvents'

jest.mock('@/app/actions/getFavoriteEvents')

describe('FavoritesPage', () => {
    beforeEach(() => {
        ;(getFavoriteEvents as jest.Mock).mockResolvedValue([
            {
                id: '1',
                title: 'Favorite Event',
                // ... autres propriétés
            }
        ])
    })

    it('renders favorite events', async () => {
        render(await FavoritesPage())
        expect(screen.getByText('Favorite Event')).toBeInTheDocument()
    })

    it('shows empty state when no favorites', async () => {
        ;(getFavoriteEvents as jest.Mock).mockResolvedValue([])
        render(await FavoritesPage())
        expect(screen.getByText('No favorites found')).toBeInTheDocument()
    })
})