'use client';

import {SafeEvent, SafeReservation, SafeUser} from "@/app/types";
import React from "react";
import Heading from "@/app/components/Heading";
import {EventCard} from "@/app/components/events/EventCard";
import {Container} from "@/app/components/Container";


interface EventListCardProps {
    reservations?: SafeReservation[]; // Remove the union with undefined
    events: SafeEvent[] | any;
    currentUser?: SafeUser | any;
}


export const  EventListCard: React.FC<EventListCardProps> = ({
    reservations = [],
    events,
    currentUser
    }) => {
    return (
        <Container>
            <div
                className="
                      max-w-screen-lg
                      mx-auto
                      pt-[40px]
                      md:pt-[100px]
                    "
            >
                <div className="flex flex-col gap-6 pt-[50px]">
                    <Heading
                        title={`Event for ${new Date().toLocaleString('default', { month: 'long' })}`}
                        subtitle="Your favorite events!"
                    />
                    <hr
                        className="
                                    border-[1px]
                                    border-[#e4e4e4]
                                    w-[100%]
                                    my-[20px]
                                    md:my-[20px]
                                  "
                    />
                    <div
                        className="
                                    pt-[20px]
                                    pb-[60px]
                                    md:pt-[20px]
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
                        {events.filter((event: any) => new Date(event.startDate).getMonth() === new Date().getMonth()).map((event: any) => (
                            <EventCard
                                currentUser={currentUser}
                                key={event.id}
                                event={event}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </Container>
    )
};
