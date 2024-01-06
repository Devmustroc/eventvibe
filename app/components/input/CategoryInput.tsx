import {IconType} from "react-icons";
import React from "react";

interface CategoryInputProps {
    label: string;
    icon: IconType;
    selected?: boolean;
    onClick: (value: string) => void;
}

export const CategoryInput: React.FC<CategoryInputProps> = ({
    icon: Icon,
    label,
    selected,
    onClick
    }) => {
    return (
        <div
            onClick={() => onClick(label)}
            className={`
                rounded-xl
                border-2
                border-brand_gray
                p-4
                flex
                gap-3
                items-center
                hover:border-brand_secondary/70
                hover:justify-center
                hover:transition
                hover:duration-200
                transition
                cursor-pointer
                ${selected ? "border-brand_primary/70 text-brand_secondary justify-center hover:bg-brand_secondary/40 hover:text-brand_secondary/70" : 
                "border-brand_secondary/70 text-brand_secondary hover:bg-brand_primary/70 hover:text-brand_black hover:transition hover:duration-200"}
            `}
        >
            <Icon size={30} />
            <div
                className="
                    text-sm
                    font-semibold
                "

            >
                {label}
            </div>
        </div>
    );
};
