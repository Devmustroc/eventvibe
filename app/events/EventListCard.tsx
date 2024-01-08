'use client';

import {SafeEvent, SafeReservation, SafeUser} from "@/app/types";
import React from "react";
import {Wrapper} from "@/app/components/wrapper";
import {CardEvent} from "@/app/components/events/CardEvent";




interface EventListCardProps {
    reservation?: SafeReservation[] | any; // Remove the union with undefined
    events: SafeEvent[] | any
    currentUser?: SafeUser | null;
}


export const  EventListCard: React.FC<EventListCardProps> = ({
    events,
    currentUser
    }) => {


    return (
        <>
            <Wrapper>
            <div
                className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                <div>
                </div>
                {events.map((events: any) => (
                    <CardEvent
                        key={events.id}
                        events={events}
                        currentUser={currentUser}
                    />
                ))}
            </div>
            </Wrapper>
        </>
    )
};
