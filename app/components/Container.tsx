'use client';

import React from "react";

interface ContainerProps {
    children: React.ReactNode;
    className?: string;
}

export const Container: React.FC<ContainerProps> = ({ children, className }) => {

    return (
        <div
            className={`
                max-w-[2150px]
                mx-auto
                xl:px-20
                md:px-10
                sm:px-2
                ${className || ''}
                px-4
                `}
        >
            { children }
        </div>
    );
};
