
import ClientOnly from "@/app/components/ClientOnly";
import {EmptyState} from "@/app/components/EmptyState";
import {getEvents, IEventParams} from "@/app/actions/getEvents";
import {EventCard} from "@/app/components/events/EventCard";
import getCurrentUser from "@/app/actions/getCurrentUser";
import React from "react";
import HeroVideo from "@/app/components/HeroVideo";
import Heading from "@/app/components/Heading";
import {Wrapper} from "@/app/components/wrapper";


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
    console.log(typeof events);


      if (events.length === 0) return (
          <ClientOnly>
              <HeroVideo
                  currentUser={currentUser}
              />
              <EmptyState showReset/>
          </ClientOnly>
      )

    return (
        <>
            <HeroVideo
                currentUser={currentUser}
            />

                <Wrapper>
                        <ClientOnly>

                          <Heading
                              title="Upcoming Events"
                              subtitle="Find the best events near you!"
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

                              {events.filter((event: any) => new Date(event.startDate) > new Date()).map((event: any) => (
                                  <EventCard
                                      currentUser={currentUser}
                                      key={event.id}
                                      event={event}
                                  />
                              ))}
                          </div>
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
                      </ClientOnly>
                </Wrapper>
        </>

    );
}

export default Home;
