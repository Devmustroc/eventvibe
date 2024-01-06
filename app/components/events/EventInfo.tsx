import React from 'react';
import Avatar from '@/app/components/Avatar';
import { ListCategory } from '@/app/components/events/ListCategory';
import dynamic from 'next/dynamic';
import { SafeUser } from '@/app/types';
import useCountries from '@/app/hooks/useCountries';
import {IconType} from "react-icons";
import {FaLocationDot} from "react-icons/fa6";
import {AvatarMatchList} from "@/app/components/AvatarMatchList";

const Map = dynamic(() => import('@/app/components/Map'), { ssr: false });


interface EventInfoProps {
    user: SafeUser | null;
    description: string;
    guestCount: number;
    remainingPlaces?: number;
    locationValue: string;
    endDate: Date;
    startDate: Date;
    category?: {
        label: string;
        description: string;
        icon: IconType;
    };
    currentUser?: SafeUser | null;
    address: string;
    zipcode: string;
    city: string;
    rating: number;
    onRating?: (rating: number) => void;
    userMatch?: SafeUser[];
}

export const EventInfo: React.FC<EventInfoProps> = ({
    user,
    description,
    guestCount,
    remainingPlaces,
    locationValue,
    category,
    address,
    zipcode,
    city,
    userMatch
    }) => {

    const { getByValue } = useCountries();

    const coordinates = getByValue(locationValue)?.latlng;

    return (
        <div
            className="
                pt-8
                col-span-4
                flex
                flex-col
                gap-8
              "
        >
            <div
                className="
                  flex
                  flex-col
                  gap-4
                "
            >
                <div
                    className="
                    text-xl
                    font-semibold
                    flex
                    flex-row
                    items-center
                    gap-2
                  "
                >
                    <Avatar
                        src={user?.image}
                    />
                    <div>
                        Hosted by {user?.name}
                    </div>
                </div>
                <div
                    className="
                        flex
                        flex-row
                        items-center
                        gap-4
                        font-light
                        text-brand_secondary
                      "
                >
                    <div>
                        {guestCount} Attendees
                    </div>
                    {remainingPlaces !== undefined && (
                        <div>
                            {remainingPlaces} Places Remaining
                        </div>
                    )}
                </div>
                <AvatarMatchList
                    userMatch={userMatch}
                />
            </div>
            <hr/>
            {category && (
                <ListCategory
                    icon={category.icon}
                    label={category.label}
                    description={category.description}
                />
            )}
            <hr/>
            <div
                className="
                      text-lg
                      font-light
                      text-brand_secondary
        "
            >
                {description}
            </div>
            <hr/>
            <div
                className='
                    flex
                    flex-row
                    gap-4
                    items-center
                '
            >
                <FaLocationDot/>
                <div
                    className="
                        flex
                        flex-col
                    "
                >
                    <div
                        className="
                            text-md
                            capitalize
                        "
                    >
                        {address}
                    </div>
                    <div
                        className="
                            text-md
                            capitalize
                        "
                    >
                        {zipcode} {city}
                    </div>
                </div>
            </div>
            <hr/>
            <Map center={coordinates}/>
        </div>
    );
};
