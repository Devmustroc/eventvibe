import useRentModal from '@/app/hooks/useRentModal'
import { renderHook, act } from '@testing-library/react'

describe('useRentModal', () => {
    it('manages modal state correctly', () => {
        const { result } = renderHook(() => useRentModal())

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