'use client';


import {SafeUser} from "@/app/types";
import {RiHeart2Line, RiHeart3Fill} from "react-icons/ri";
import React from "react";
import useFavorite from "@/app/hooks/useFavorite";

interface HeartButtonProps {
    organizerId: string;
    currentUser?: SafeUser | null;
}


export const HeartButton: React.FC<HeartButtonProps> = ({
    organizerId,
    currentUser
    }) => {
    const {hasFavorite, toggleFavorite } = useFavorite({
        organizerId,
        currentUser
    });
    return (
        <div
            role="button"
            onClick={toggleFavorite}
            className={`relative cursor-pointer flex items-center gap-1 text-gray-400 group-hover:text-gray-600 ${hasFavorite ? 'fill-red-600' : ''}`}
        >
            <RiHeart2Line
                size={28}
                className="
                    absolute
                    rounded-md
                    -bottom-[8px]
                    -left-[12px]
                "
            />
            <RiHeart3Fill
                size={28}
                className={`
                    absolute
                    -bottom-[8px]
                    -left-[12px]
                    ${hasFavorite ? 'block fill-red-600' 
                    : 'hidden fill-brand_secondary/20'}
                `}
            />
        </div>
    );
};
