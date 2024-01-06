'use client';

import {SafeReservation, SafeUser} from "@/app/types";
import {Container} from "@/app/components/Container";
import Heading from "@/app/components/Heading";
import {useRouter} from "next/navigation";
import React, {useCallback, useState} from "react";
import axios from "axios";
import toast from "react-hot-toast";
import {EventCard} from "@/app/components/events/EventCard";

interface ReservationClientProps {
    reservation: SafeReservation[];
    currentUser: SafeUser | null;
}


export const ReservationClient: React.FC<ReservationClientProps> = ({
    reservation,
    currentUser
     }) => {
    const router = useRouter();
    const [deleteId, setDeleteId] = useState("");

    const onCancel = useCallback((id: string) => {
        setDeleteId(id);

        axios.delete(`/api/reservations/${id}`)
            .then(() => {
                toast.success('Reservation cancelled');
                router.refresh();
            })
            .catch((error) => {
                console.error(error);
                toast.error("something went wrong");
            })
            .finally(() => {
                setDeleteId('');
            })
    }, [router]);
    return (
        <Container>
            <Heading
                title="Reservations"
                subtitle="Your Event Attendees"
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
                {reservation.map((reservation) => (
                    <EventCard
                        key={reservation.id}
                        event={reservation.listing}
                        reservation={reservation}
                        actionId={reservation.id}
                        onAction={onCancel}
                        disabled={deleteId === reservation.id}
                        actionLabel="Cancel Guest"
                        currentUser={currentUser}
                    />
                ))}
            </div>
        </Container>
    );
};
