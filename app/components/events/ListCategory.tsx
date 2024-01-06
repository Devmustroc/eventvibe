'use client';

import React from "react";

interface ListCategoryProps {
    icon: string | any;
    label: string;
    description: string;
}



export const ListCategory: React.FC<ListCategoryProps>= ({
    icon: Icon,
    label,
    description
    }) => {
    return (
        <div
            className="
                flex
                flex-col
                gap-6
            "
        >
            <div
                className="
                    flex
                    flex-row
                    items-center
                    gap-4
                "
            >
                <Icon  />
                <div
                    className="
                        flex
                        flex-col
                        gap-2
                    "
                >
                    <div
                        className="
                            text-lg
                            font-semibold
                        "
                    >
                        {label}
                    </div>
                    <div
                        className="
                            text-gray-400
                            font-light
                        "
                    >
                        {description}
                    </div>
                </div>
            </div>
        </div>
    );
};
