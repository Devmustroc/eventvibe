'use client';


import {SafeUser} from "@/app/types";
import useCountries from "@/app/hooks/useCountries";
import Heading from "@/app/components/Heading";
import Image from "next/image";
import {HeartButton} from "@/app/components/HeartButton";
import React from "react";

interface EventHeaderProps {
    title: string;
    imageSrc: string;
    locationValue: string;
    id: string;
    currentUser?: SafeUser | null;
}

export const EventHeader: React.FC<EventHeaderProps> = ({
    title,
    imageSrc,
    locationValue,
    id,
    currentUser
     }) => {
    const { getByValue } = useCountries();
    const location = getByValue(locationValue);
    return (
        <>
            <div
                className="
                    w-full
                    h-[60vh]
                    overflow-hidden
                    rounded-xl
                    justify-center
                    relative
                "
            >
                <Image
                    alt='event image'
                    src={imageSrc}
                    fill
                    className="
                        object-cover
                        w-full
                        h-full
                        mx-auto
                        block
                      "
                />
                <div
                    className="
                        absolute
                        bottom-5
                        left-5
                    "
                >
                    <HeartButton
                        organizerId={id}
                        currentUser={currentUser}
                    />
                </div>

            </div>
            <Heading
                title={title}
                subtitle={`${location?.label} - ${location?.region}`}
                center
            />
        </>
    );
};
