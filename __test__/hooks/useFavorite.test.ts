import { renderHook, act } from '@testing-library/react'
import useFavorite from '@/app/hooks/useFavorite'
import axios from 'axios'

jest.mock('axios')

describe('useFavorite Hook', () => {
    const mockCurrentUser = {
        id: '1',
        favoriteIds: ['2', '3']
    }

    it('returns correct favorite status', () => {
        const { result } = renderHook(() =>
            useFavorite({
                organizerId: '2',
                currentUser: mockCurrentUser as any
            })
        )

        expect(result.current.hasFavorite).toBe(true)
    })

    it('toggles favorite status correctly', async () => {
        ;(axios.post as jest.Mock).mockResolvedValue({ data: {} })

        const { result } = renderHook(() =>
            useFavorite({
                organizerId: '4',
                currentUser: mockCurrentUser as any
            })
        )

        await act(async () => {
            await result.current.toggleFavorite({ stopPropagation: () => {} } as any)
        })

        expect(axios.post).toHaveBeenCalledWith('/api/favorites/4')
    })
})