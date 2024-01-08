'use client';


import {SafeEvent, SafeReservation, SafeUser} from "@/app/types";
import React, {useCallback,  useMemo} from "react";
import {useRouter} from "next/navigation";
import useCountries from "@/app/hooks/useCountries";
import {format} from "date-fns";
import Image from "next/image";
import {HeartButton} from "@/app/components/HeartButton";
import Button from "@/app/components/Button";



interface EventCardProps {
    event: SafeEvent;
    reservation?: SafeReservation;
    onAction?: (id: string) => void;
    onActionUpdate?: (id: string) => void;
    disabled?: boolean;
    actionLabel?: string;
    actionId?: string;
    currentUser?: SafeUser | null;
}

export const EventCard: React.FC<EventCardProps> = ({
    event,
    reservation,
    onAction,
    disabled,
    actionLabel,
    actionId    = '',
    currentUser,
    }) => {
    const router = useRouter();
    const { getByValue } = useCountries();


    const location = getByValue(event.locationValue);

    const handleCancel = useCallback(async (e: React.MouseEvent<HTMLButtonElement>) => {
            e.stopPropagation();

            if (disabled) return;

            onAction?.(actionId);
    }, [onAction, actionId, disabled]);


    const price = useMemo(() => {
        if (reservation) {
            return reservation.totalPrice;
        }
        return event.price;
    }, [reservation, event]);

    const reservationDate = useMemo(() => {
        if (!reservation) return null;
        const start = new Date(reservation.startDate);
        const end = new Date(reservation.endDate);

        return `${format(start, 'PP')} - ${format(end, 'PP')}`
    }, [reservation]);

    const formattedDate = useMemo(() => {
        if(!event.startDate && !event.endDate) return null;
        const start = new Date(event.startDate);
        const end = new Date(event.endDate);

        return `${format(start, 'PP')} - ${format(end, 'PP')}`

    }, [
        event.startDate,
        event.endDate
    ]);


    return (
        <div
            className="
                col-span-1
                rounded-xl
                group
                transition
                cursor-pointer
                shadowHero
                duration-200
                ease-in-out
                hover:shadow-md
            "
        >
            <div
                onClick={() => router.push(`/events/${event.id}`)}
                className="
                    flex
                    flex-col
                    gap-3
                    rounded-md
                    overflow-hidden
                    w-full
                "
            >
                <div
                    className="
                        aspect-square
                        w-full
                        relative
                        overflow-hidden
                        rounded-xl
                    "
                >
                    <Image
                        fill
                        alt="Event Image"
                        src={event.imageSrc}
                        className="
                            object-cover
                            h-full
                            w-full
                            group-hover:scale-x-110
                            group-hover:scale-y-105
                            transition
                        "
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div
                        className="
                            absolute
                            bottom-5
                            left-5
                        "
                    >
                        <HeartButton
                            organizerId={event.id}
                            currentUser={currentUser}
                        />
                    </div>
                </div>
                <div
                    className="
                        font-semibold
                        px-2
                        text-lg
                        md:text-l
                        sm:text-sm
                        xl:text-l
                        2xl:text-l
                    "
                >
                    {`${event.title.slice(0, 20)}...`}
                </div>
                <div
                    className="
                        font-light
                        text-brand_secondary
                        text-lg
                        px-2
                    "
                >
                    <div
                        className="
                            flex
                            flex-row
                            justify-between
                            my-3
                        "
                    >
                        {
                            reservation
                                ? (
                                    <div
                                        className="
                                            text-black
                                            text-sm
                                        "
                                    >
                                        {reservationDate}
                                    </div>
                                )
                                : (
                                    <div
                                        className="
                                            text-black
                                            text-sm
                                        "
                                    >
                                        {formattedDate}
                                    </div>
                                )
                        }
                    </div>
                    <div
                        className="
                            flex
                            flex-row
                            justify-between
                            items-center
                            px-3
                            py-5
                        "
                    >
                        <div
                            className="
                            text-gray-400
                            text-sm
                        ">
                            {event.category}
                        </div>
                        <div
                            className="
                            text-black
                            text-sm
                        "
                        >
                            {event.city}
                        </div>
                        <div
                            className="
                            text-gray-900
                            text-sm
                        ">
                            {location?.flag}
                        </div>
                    </div>
                </div>
                <div
                    className="
                        flex
                        flex-row
                        justify-between
                        items-center
                        gap-1
                        mb-1
                        px-2
                    "
                >
                    <div
                        className="
                            px-2
                            py-1
                            bg-brand_secondary/20
                            rounded-lg
                            text-semibold
                        "
                    >
                        {`${price === 0 ? 'Free' : price} €`}
                    </div>
                    {!reservation && (
                        <div
                            className="
                                text-gray-400
                                rounded-lg
                            "
                        >
                            Person
                        </div>
                    )}
                </div>

            </div>
            <div
                className="
                        flex
                        flex-col
                        justify-between
                        items-center
                        px-4
                        py-2
                        bg-gray-100
                        gap-3
                    "
            >
                {onAction && actionLabel && (
                    <>
                        <Button
                            disabled={disabled}
                            small
                            label={actionLabel}
                            onClick={handleCancel}
                        />
                    </>
                )}
            </div>
        </div>
    );
};
