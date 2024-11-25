import useCountries from '@/app/hooks/useCountries'
import { renderHook } from '@testing-library/react'

describe('useCountries', () => {
    it('returns formatted countries list', () => {
        const { result } = renderHook(() => useCountries())
        const countries = result.current.getAllCountries()

        expect(Array.isArray(countries)).toBe(true)
        expect(countries[0]).toHaveProperty('value')
        expect(countries[0]).toHaveProperty('label')
        expect(countries[0]).toHaveProperty('flag')
        expect(countries[0]).toHaveProperty('latlng')
        expect(countries[0]).toHaveProperty('region')
    })

    it('finds country by value', () => {
        const { result } = renderHook(() => useCountries())
        const country = result.current.getByValue('FR')

        expect(country).toBeDefined()
        expect(country?.label).toBe('France')
    })

    it('returns undefined for invalid country code', () => {
        const { result } = renderHook(() => useCountries())
        const country = result.current.getByValue('INVALID')
        expect(country).toBeUndefined()
    })
})