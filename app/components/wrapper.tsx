import React from "react";

interface WrapperProps {
    children: React.ReactNode;
    className?: string;
}

export const Wrapper: React.FC<WrapperProps> = ({
    children,
    className
     }) => {
    return (
        <div
            className={`
                max-w-[1520px]
                mx-auto
                xl:px-20
                md:px-10
                sm:px-2
                ${className || ''}
                px-4
                `}
        >
            {children}
        </div>
    );
};
