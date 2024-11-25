import useSearchModal from '@/app/hooks/useSearchModal'
import { renderHook, act } from '@testing-library/react'

describe('useSearchModal', () => {
    it('toggles search modal visibility', () => {
        const { result } = renderHook(() => useSearchModal())

        expect(result.current.isOpen).toBe(false)

        act(() => {
            result.current.onOpen()
        })
        expect(result.current.isOpen).toBe(true)

        act(() => {
            result.current.onClose()
        })
        expect(result.current.isOpen).toBe(false)
    })
})