import {SafeEvent, SafeUser} from "@/app/types";
import React from "react";
import {Container} from "@/app/components/Container";
import Heading from "@/app/components/Heading";
import {EventCard} from "@/app/components/events/EventCard";


interface FavoritesClientProps {
    event: SafeEvent[];
    currentUser: SafeUser | null;
}

export const FavoritesClient: React.FC<FavoritesClientProps> = ({
    event,
    currentUser
    }) => {
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
