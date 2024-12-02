import { render, screen } from '@testing-library/react';
import Map from '@/app/components/Map';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';

// Mock react-leaflet components
vi.mock('react-leaflet', () => ({
    MapContainer: vi.fn(({ children, ...props }) => (
        <div data-testid="map-container" {...props}>
            {children}
        </div>
    )),
    TileLayer: vi.fn(() => <div data-testid="tile-layer" />),
    Marker: vi.fn(() => <div data-testid="map-marker" />)
}));

// Mock leaflet
vi.mock('leaflet', () => ({
    default: {
        Icon: {
            Default: {
                prototype: {
                    _getIconUrl: null
                },
                mergeOptions: vi.fn()
            }
        }
    }
}));

// Mock leaflet CSS
vi.mock('leaflet/dist/leaflet.css', () => ({}));

// Mock marker icons
vi.mock('leaflet/dist/images/marker-icon-2x.png', () => ({
    default: { src: 'marker-icon-2x.png' }
}));
vi.mock('leaflet/dist/images/marker-icon.png', () => ({
    default: { src: 'marker-icon.png' }
}));
vi.mock('leaflet/dist/images/marker-shadow.png', () => ({
    default: { src: 'marker-shadow.png' }
}));

describe('Map', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders map with default center when no center prop is provided', () => {
        render(<Map />);
        
        const mapContainer = screen.getByTestId('map-container');
        const tileLayer = screen.getByTestId('tile-layer');
        const marker = screen.queryByTestId('map-marker');
        
        expect(mapContainer).toBeInTheDocument();
        expect(mapContainer).toHaveClass('h-[35vh]');
        expect(mapContainer).toHaveClass('rounded-lg');
        expect(tileLayer).toBeInTheDocument();
        expect(marker).not.toBeInTheDocument();
    });

    it('renders map with provided center coordinates', () => {
        const center = [51.505, -0.09];
        render(<Map center={center} />);
        
        const mapContainer = screen.getByTestId('map-container');
        const marker = screen.getByTestId('map-marker');
        
        expect(mapContainer).toBeInTheDocument();
        expect(marker).toBeInTheDocument();
    });

    it('renders map with correct zoom level based on center prop', () => {
        const center = [51.505, -0.09];
        render(<Map center={center} />);
        
        const mapContainer = screen.getByTestId('map-container');
        expect(mapContainer).toHaveAttribute('zoom', '4');
    });

    it('renders map with default zoom level when no center prop is provided', () => {
        render(<Map />);
        
        const mapContainer = screen.getByTestId('map-container');
        expect(mapContainer).toHaveAttribute('zoom', '2');
    });

    it('renders map with correct styling classes', () => {
        render(<Map />);
        
        const mapContainer = screen.getByTestId('map-container');
        expect(mapContainer).toHaveClass('h-[35vh]');
        expect(mapContainer).toHaveClass('rounded-lg');
        expect(mapContainer).toHaveClass('shadow-[5px_5px_30px_#bdcbc4]');
    });

    it('renders tile layer with correct URL', () => {
        render(<Map />);
        
        const tileLayer = screen.getByTestId('tile-layer');
        expect(tileLayer).toBeInTheDocument();
        expect(TileLayer).toHaveBeenCalledWith(
            expect.objectContaining({
                url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            }),
            expect.anything()
        );
    });
});