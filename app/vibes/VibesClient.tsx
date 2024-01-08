'use client';


import React, {useCallback, useState} from 'react';
import {SafeReservation, SafeUser} from "@/app/types";
import {Container} from "@/app/components/Container";
import Heading from "@/app/components/Heading";
import {useRouter} from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import {EventCard} from "@/app/components/events/EventCard";
import {NothingPage} from "@/app/components/NothingPage";



interface VibesClientProps {
    reservations?: SafeReservation[]; // Remove the union with undefined
    currentUser?: SafeUser | null;

}



const VibesClient: React.FC<VibesClientProps> = ({
                                                     reservations = [],
                                                     currentUser
                                                 }) => {
    const router = useRouter();
    const [deletingId, setDeletingId] = useState("");

    const onCancel = useCallback((id: string) => {
        setDeletingId(id);

        axios.delete(`/api/reservations/${id}`)
            .then(() => {
                toast.success('Reservation cancelled');
                router.refresh();
            })
            .catch((error) => {
                toast.error(error?.response?.data?.error)
            })
            .finally(() => {
                setDeletingId('');
            })
    }, [router]);

    if (reservations.length === 0) {
        return (
            <div
                className="
                    flex
                    justify-center
                    items-center
                "
            >
                <div
                    className="
                        grid
                        grid-cols-1
                        gap-4
                        border-b-[1px]
                        rounded-b-3xl
                        shadow-blue-500
                    "
                >
                    <NothingPage
                        title="No vibes"
                        subtitle='Please add vibes.'
                    />
                </div>
            </div>
        )
    }


    return (
        <Container>
            <Heading
                title="My Vibes"
                subtitle="Your event vibes are here"
                center
            />
            <div
                className="
                    mt-10
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
                {reservations.map((reservation: any) => (
                    <EventCard
                        key={reservation.id}
                        event={reservation.listing}
                        reservation={reservation}
                        actionId={reservation.id}
                        onAction={onCancel}
                        disabled={deletingId === reservation.id}
                        actionLabel="Cancel reservation"
                        currentUser={currentUser}
                    />
                ))}
            </div>

        </Container>
    )
};

export default VibesClient;