import React from "react";
import getCurrentUser from "@/app/actions/getCurrentUser";
import {getAllEvents} from "@/app/actions/getAllEvents";
import ClientOnly from "@/app/components/ClientOnly";
import {EventListCard} from "@/app/events/EventListCard";





const EventPage = async () => {
    const currentUser = await getCurrentUser();
    const events = await getAllEvents();


    return (
        <ClientOnly>
            <ClientOnly>
                <EventListCard
                    currentUser={currentUser}
                    events={events}
                />
            </ClientOnly>
        </ClientOnly>
    );
};

export default EventPage;