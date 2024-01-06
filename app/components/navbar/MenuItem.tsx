'use client';

import React from "react";

interface MenuItemProps {
    label: string;
    onClick: () => void;
}

const MenuItem: React.FC<MenuItemProps> = ({
    label,
    onClick
    }) => {
    return (
        <div
            onClick={onClick}
            className="
                px-4
                py-3
                text-sm
                hover:bg-brand_gray
                hover:text-white
                transition
                font-semibold
            "
        >
            { label }
        </div>
    );
};

export default MenuItem;
