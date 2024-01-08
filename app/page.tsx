import ClientOnly from "@/app/components/ClientOnly";
import {EmptyState} from "@/app/components/EmptyState";
import {getEvents, IEventParams} from "@/app/actions/getEvents";
import {EventCard} from "@/app/components/events/EventCard";
import getCurrentUser from "@/app/actions/getCurrentUser";
import React from "react";
import HeroVideo from "@/app/components/HeroVideo";
import Heading from "@/app/components/Heading";
import {Wrapper} from "@/app/components/wrapper";
import Image from "next/image";
import Categories from "@/app/components/navbar/Categories";
import {NextEvent} from "@/app/components/events/NextEvent";
import {Container} from "@/app/components/Container";


export const dynamic = 'force-dynamic';

interface HomeProps {
    searchParams: IEventParams;
}


const Home = async ({
                        searchParams
     } : HomeProps
     ) => {
    const events = await getEvents(searchParams);
    const currentUser = await getCurrentUser();


    if (events.length === 0) {
        return (
            <ClientOnly
            >
                <HeroVideo
                    currentUser={currentUser}
                />
                <div
                    className="
                                    pb-[100px]
                    "
                >
                    <div
                        className="
                        pb[80px]
                                  "
                    >
                        <Categories/>
                    </div>
                </div>
                    <EmptyState showReset/>
            </ClientOnly>
    )
    }
    return (
        <>
            <HeroVideo
                currentUser={currentUser}
            />
            <div
                className="
                                    pb-[50px]
            "
            >
                <div
                    className="
                        pb[20px]
                    "
                >
                    <Categories/>
                </div>
                <Container>
                    <Wrapper>
                        <ClientOnly>
                            <div
                                className="
                                    flex
                                    flex-row
                                    justify-start
                                    items-center
                                    w-full
                                    mb-10
                                    gap-2
                                    pt-[30px]
                                  "
                            >
                                <Image
                                    src="/images/logo-min.png"
                                    alt="logo"
                                    width={50}
                                    height={50}
                                />
                                <Heading
                                    title="Upcoming Events"
                                    subtitle="Find the best events near you!"
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

                                {events.filter((event: any) => new Date(event.startDate) > new Date()).map((event: any) => (
                                    <EventCard
                                        currentUser={currentUser}
                                        key={event.id}
                                        event={event}
                                    />
                                ))}
                            </div>
                            <NextEvent
                                events={events}
                                currentUser={currentUser}
                            />
                        </ClientOnly>
                    </Wrapper>
                </Container>
            </div>
        </>

    );
}

export default Home;
