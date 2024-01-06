'use client';

import React, {useState} from "react";
import {FaStar} from "react-icons/fa6";

interface RatingProps {
    rating: number;
    onRating?: (rating: number) => void;
}

export const Rating : React.FC<RatingProps> = ({
    rating,
    onRating
    }) => {
    const [hover, setHover] = useState(rating);

    const handleRating = (rating: number) => {
        setHover(rating);
        onRating && onRating(rating);
    };

    return (
        <div
            className="
                flex
                flex-row
                items-center
                justify-center
                gap-2
                "
        >
            {[...Array(5)].map((_, i) => {
                const ratingValue = i + 1;

                return (
                    <label
                        key={i}
                        className="
                            cursor-pointer
                            "
                    >
                        <input
                            type="radio"
                            name="rating"
                            value={ratingValue}
                            onClick={() => handleRating(ratingValue)}
                            className="
                                hidden
                                "
                        />
                        <FaStar
                            className={`
                                text-3xl
                                ${ratingValue <= (hover || rating) ? "text-yellow-500" : "text-gray-400"}
                                `}
                        />
                    </label>
                );
            })}
        </div>
    );
}


