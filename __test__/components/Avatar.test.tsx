import { render, screen } from '@testing-library/react'
import Avatar from '@/app/components/Avatar'

describe('Avatar', () => {
    it('renders with default image when no src provided', () => {
        render(<Avatar src={null} />)
        const img = screen.getByRole('img')
        expect(img).toHaveAttribute('src', expect.stringMatching(/\/_next\/image\?url=%2Fimages%2Flogo-min\.png/))
    })
})