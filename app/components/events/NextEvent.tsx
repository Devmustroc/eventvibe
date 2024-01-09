import Image from "next/image";
import Heading from "@/app/components/Heading";
import {EventCard} from "@/app/components/events/EventCard";
import React from "react";
import {SafeEvent, SafeUser} from "@/app/types";


interface NextEventProps {
    events: SafeEvent[] | any;
    currentUser?: SafeUser | null;
}

export const NextEvent: React.FC<NextEventProps> = ({
    events,
    currentUser
    }) => {
    return (
        <>
            <div
                className="
                                    flex
                                    flex-row
                                    justify-start
                                    items-center
                                    w-full
                                    mb-10
                                    gap-2
                                  "
            >
                <Image
                    src="/images/logo-min.png"
                    alt="logo"
                    width={50}
                    height={50}
                />
                <Heading
                    title={`Event for ${new Date().toLocaleString('default', {month: 'long'})}`}
                    subtitle="Your favorite events!"
                />
            </div>

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
        </>
    );
};
