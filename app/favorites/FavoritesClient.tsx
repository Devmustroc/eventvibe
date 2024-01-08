'use client';

import {SafeEvent, SafeUser} from "@/app/types";
import React from "react";
import {Container} from "@/app/components/Container";
import Heading from "@/app/components/Heading";
import {EventCard} from "@/app/components/events/EventCard";
import {useRouter} from "next/navigation";


interface FavoritesClientProps {
    event: SafeEvent[];
    currentUser: SafeUser | null;
}

export const FavoritesClient: React.FC<FavoritesClientProps> = ({
    event,
    currentUser
    }) => {
    const router = useRouter();

    const handleAddFavorites = () => {
        router.push('/events');
    };

    if (event.length === 0) {
        return (
        <Container>
            <div
                className="
                        flex
                        flex-row
                        justify-evenly
                        items-center
                        w-[90vw]
                        h-[70vh]
                        bg-red
                    "
            >
                <div
                    className="max-w-sm p-6 bg-brand_white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <a href="#">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            No Favorites Yet
                        </h5>
                    </a>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                        You have no favorite events yet. Add some to your list.
                    </p>
                    <button
                        onClick={() => handleAddFavorites()}
                        className="
                                inline-flex
                                items-center
                                justify-center
                                px-4
                                py-2
                                text-base
                                font-medium
                                text-white
                                bg-brand_secondary
                                border border-transparent
                                rounded-md
                                shadow-sm
                                hover:bg-brand_primary
                                focus:outline-none
                                focus:ring-2
                                focus:ring-offset-2
                                focus:ring-brand_primary
                                "
                        >
                            Add Favorites
                    </button>
                </div>
            </div>
        </Container>
    )
    }


    return (
        <Container>
            <Heading
                title="Favorites"
                subtitle="Your Favorite Vibes"
                center
            />
            <div
                className="
                    mt-10
                    grid
                    grid-cols-1
                    sm:grid-cols-2
                    md:grid-cols-3
                    lg:grid-cols-4
                    xl:grid-cols-5
                    2xl:grid-cols-6
                    gap-8
                "
            >
                {event.map((event) => (
                    <EventCard
                        key={event.id}
                        event={event}
                        currentUser={currentUser}
                    />
                ))}
            </div>
        </Container>
    );
};
