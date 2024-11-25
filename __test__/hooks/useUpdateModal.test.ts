import useUpdateModal from '@/app/hooks/useUpdateModal'
import { renderHook, act } from '@testing-library/react'

describe('useUpdateModal', () => {
    it('manages update modal state and data', () => {
        const { result } = renderHook(() => useUpdateModal())

        expect(result.current.isOpen).toBe(false)
        expect(result.current.updateEvent).toEqual({})

        act(() => {
            result.current.onOpen()
        })
        expect(result.current.isOpen).toBe(true)

        act(() => {
            result.current.updateListing()
        })
        expect(result.current.updateEvent).toEqual({})
    })
})