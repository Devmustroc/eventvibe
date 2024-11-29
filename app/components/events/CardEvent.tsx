import { SafeEvent, SafeUser } from "@/app/types";
import React from "react";
import { format } from "date-fns";
import useCountries from "@/app/hooks/useCountries";
import { AvatarMatchList } from "@/app/components/AvatarMatchList";

interface CardEventProps {
    events: SafeEvent[] | any;
    currentUser: SafeUser | undefined | null;
}

export const CardEvent: React.FC<CardEventProps> = ({
    events,
}) => {

    const { getByValue } = useCountries();
    const location = getByValue(events.locationValue);

    const formattedDate = format(new Date(events.startDate), 'PP');
    const formattedDate2 = format(new Date(events.endDate), 'PP');

    return (
        <div
            data-cy="event-card"
            className="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <a href="#">
                <img data-cy="event-image" className="rounded-lg pb-8" src={events.imageSrc} alt={events.title} />
            </a>
            <div className="px-5 pb-5">
                <h5 data-cy="event-title" className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{events.title}</h5>
                <p
                    data-cy="event-description"
                    className="mt-2 text-gray-600 dark:text-gray-400 pb-8">
                    {events.description}
                </p>
                <p
                    data-cy="event-dates"
                    className="mt-2 text-brand_secondary dark:text-gray-400 pb-8">
                    <span>{formattedDate} - {formattedDate2}</span>
                </p>
                <p
                    data-cy="event-location"
                    className="mt-2 text-brand_secondary dark:text-gray-400 pb-1">
                    <span
                        className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">{location?.flag}</span><span> - {events.city}</span>
                </p>
                <div className="flex items-center mt-2.5 mb-5">
                    <AvatarMatchList
                        userMatch={events.userMatch}
                    />
                </div>
                <div className="flex items-center justify-between">
                    <span data-cy="event-price" className="text-3xl font-bold text-gray-900 dark:text-white bg-brand_secondary/20 px-2 rounded-lg">{events.price} €</span>
                    <a href="#"
                       data-cy="book-now-button"
                       className="text-white bg-brand_secondary hover:bg-brand_primary focus:ring-4 focus:outline-none focus:bg-brand_secondary hover:text-brand_secondary font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Book Now</a>
                </div>
            </div>
        </div>
    );
};