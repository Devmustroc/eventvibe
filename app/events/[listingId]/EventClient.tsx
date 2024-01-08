'use client';


import React, {useCallback, useEffect, useMemo, useState} from "react";
import { categories } from "@/app/components/navbar/Categories";
import {Container} from "@/app/components/Container";
import {EventHeader} from "@/app/components/events/EventHeader";
import {SafeEvent, SafeReservation, SafeUser} from "@/app/types";
import {EventInfo} from "@/app/components/events/EventInfo";
import useLoginModal from "@/app/hooks/useLoginModal";
import {useRouter} from "next/navigation";
import { differenceInDays, eachDayOfInterval} from "date-fns";
import axios from "axios";
import toast from "react-hot-toast";
import {EventReservation} from "@/app/components/events/EventReservation";
import {Range} from "react-date-range";


interface EventClientProps {
    reservations?: SafeReservation[]; // Remove the union with undefined
    event: SafeEvent & {
        user: SafeUser;
    };
    currentUser?: SafeUser | null;
    userMatch?: SafeUser[];
}

const EventClient: React.FC<EventClientProps> = ({
      event,
      reservations = [],
      currentUser,
      userMatch
      }) => {

    const initialDateRange = useMemo(() => (
        {
            startDate: new Date(event.startDate),
            endDate: new Date(event.endDate),
            key: 'selection'
        }
    ), [event.startDate, event.endDate]);


    const loginModal = useLoginModal();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [totalPrice, setTotalPrice] = useState(event.price);
    const [dateRange, setDateRange] = useState<Range>(initialDateRange);
    const [numGuests, setNumGuests] = useState(1);
    const [rating, setRating] = useState(event.rating || 0);

    const disabledDates = useMemo(() => {
        let dates: Date[] = [];

        reservations.forEach((reservation) => {
            const range = eachDayOfInterval({
                start: new Date(reservation.startDate),
                end: new Date(reservation.endDate)
            });
            dates = [...dates, ...range];
        });

        return dates;
    }, [reservations]);

    const handleRating = useCallback((rating: number) => {
        setRating(rating);


        try {
            axios.put(`/api/events/${event.id}`, {
                rating
            }).then(() => {
                toast.success('Rating updated!');
            });

        } catch (e) {
            toast.error('Something went wrong!');
        }

    }, [event.id]);

    const onCreateReservation = useCallback(async () => {
        if (!currentUser) {
            loginModal.onOpen();
            return;
        }

        setIsLoading(true);

        try {
            await axios.post(`/api/reservations`, {
                eventId: event.id,
                startDate: dateRange.startDate,
                endDate: dateRange.endDate,
                totalPrice,
                numGuests: numGuests,
            });
            toast.success('Reservation created!');
            setIsLoading(false);
            router.push('/vibes');
        } catch (e) {
            toast.error('Something went wrong!');
        } finally {
            setIsLoading(false);
        }
    }, [currentUser, dateRange, event.id, numGuests, router, totalPrice, loginModal])


    useEffect(() => {
        if (dateRange.startDate && dateRange.endDate) {
            const days = differenceInDays(dateRange.endDate, dateRange.startDate) + 1;
            if (days && event.price ) {
                setTotalPrice(days * event.price * numGuests); // Multiply by numGuests
            } else {
                setTotalPrice(event.price * numGuests); // Multiply by numGuests
            }
        }
    }, [
        dateRange,
        event,
        numGuests // Add this line
    ]);

    const category = useMemo(() =>
            categories.find((category) =>
                category.label === event.category),
        [event.category]);

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
                    <EventHeader
                        title={event.title}
                        imageSrc={event.imageSrc}
                        locationValue={event.locationValue}
                        id={event.id}
                        currentUser={currentUser}
                    />
                    <div
                        className="
                              grid
                              grid-cols-1
                              md:grid-cols-7
                              md:gap-10
                              mt-6
                            "
                    >
                        <EventInfo
                            user={event.user}
                            category={category}
                            description={event.description}
                            guestCount={event.guestCount}
                            locationValue={event.locationValue}
                            endDate={new Date(event.endDate)}
                            startDate={new Date(event.startDate)}
                            address={event.address}
                            zipcode={event.zipcode}
                            city={event.city}
                            onRating={handleRating}
                            rating={rating}
                            userMatch={userMatch}
                        />
                        <div
                            className="
                                order-first
                                mb-10
                                md:order-last
                                md:col-span-3
                              "
                        >

                            <EventReservation
                                price={event.price}
                                totalPrice={totalPrice}
                                //@ts-ignore
                                onChangeDate={(dateRange) => setDateRange(dateRange.selection)}
                                dateRange={dateRange}
                                onSubmit={onCreateReservation}
                                disabled={isLoading}
                                disabledDates={disabledDates}
                                event={event}
                                numGuests={numGuests}
                                setNumGuests={setNumGuests}
                                guestCount={event.guestCount}
                                currentUser={currentUser}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default EventClient;