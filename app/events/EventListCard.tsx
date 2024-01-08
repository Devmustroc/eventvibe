'use client';

import {SafeEvent, SafeReservation, SafeUser} from "@/app/types";
import React from "react";
import {Wrapper} from "@/app/components/wrapper";
import {CardEvent} from "@/app/components/events/CardEvent";
import {Container} from "@/app/components/Container";




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
            <Container>
                <Wrapper>
                    <div
                        className="py-[150px] bg-white dark:bg-gray-900"
                    >
                        <div
                            className="grid grid-cols-1 gap-6 sm:grid-cols-3 lg:grid-cols-4"
                        >
                            {events.map((events: any) => (
                                <CardEvent
                                    key={events.id}
                                    events={events}
                                    currentUser={currentUser}
                                />
                            ))}
                    </div>
                    </div>
                </Wrapper>
            </Container>
        </>
    )
};
