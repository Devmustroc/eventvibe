'use client';

import React from "react";

interface HeadingProps {
    title: string;
    subtitle: string;
    center?: boolean;
    className?: string;
    subtitleClassName?: string;
}

const Heading: React.FC<HeadingProps> = ({
    title,
    subtitle,
    center,
    className,
    subtitleClassName
    }) => {
    return (

        <div
            className={center ? `text-center` : 'text-start'}
        >
            <div className={`text-3xl ${className} font-bold`}>
                {title}
            </div>
            <div
                className={`font-light ${subtitleClassName} text-brand_secondary mt-1`}
            >
                {subtitle }
            </div>
        </div>
    );
};

export default Heading;