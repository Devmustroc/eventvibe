import React from 'react';
import { render, screen } from '@testing-library/react';
import { ListCategory } from '@/app/components/events/ListCategory';
import { FaHome } from 'react-icons/fa';

describe('ListCategory', () => {
    const mockProps = {
        icon: FaHome,
        label: 'Test Label',
        description: 'Test Description'
    };

    it('renders the component with all props', () => {
        render(<ListCategory {...mockProps} />);
        
        // Vérifier que le label est présent
        expect(screen.getByText('Test Label')).toBeInTheDocument();
        
        // Vérifier que la description est présente
        expect(screen.getByText('Test Description')).toBeInTheDocument();
        
        // Vérifier que l'icône est rendu
        expect(document.querySelector('svg')).toBeInTheDocument();
    });

    it('applies correct styling classes', () => {
        const { container } = render(<ListCategory {...mockProps} />);
        
        // Vérifier les classes CSS principales
        const mainDiv = container.firstChild as HTMLElement;
        expect(mainDiv).toHaveClass('flex', 'flex-col', 'gap-6');
        
        // Vérifier les classes pour le conteneur du label
        const labelDiv = screen.getByText('Test Label').parentElement;
        expect(labelDiv).toHaveClass('flex', 'flex-col', 'gap-2');
    });

    it('renders with different icon prop', () => {
        const propsWithDifferentIcon = {
            ...mockProps,
            icon: () => <div data-testid="custom-icon">Custom Icon</div>
        };
        
        render(<ListCategory {...propsWithDifferentIcon} />);
        expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
    });
});