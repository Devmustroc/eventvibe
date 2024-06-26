'use client';

import { toast } from "react-hot-toast";
import axios from "axios";
import React, { useCallback, useState } from "react";
import { useRouter } from "next/navigation";


import Heading from "@/app/components/Heading";
import {EventCard} from "@/app/components/events/EventCard";
import {SafeEvent, SafeUser} from "@/app/types";
import {Container} from "@/app/components/Container";

interface PropertiesClientProps {
    listings: SafeEvent[];
    currentUser?: SafeUser | null,
}

const PropertiesClient: React.FC<PropertiesClientProps> = ({
                                                               listings,
                                                               currentUser
                                                           }) => {
    const router = useRouter();
    const [deletingId, setDeletingId] = useState('');

    const onDelete = useCallback((id: string) => {
        setDeletingId(id);

        axios.delete(`/api/events/${id}`)
            .then(() => {
                toast.success('Listing deleted');
                router.refresh();
            })
            .catch((error) => {
                console.error(error);
                toast.error("Couldn't delete event");
            })
            .finally(() => {
                setDeletingId('');
            })
    }, [router]);

    return (
        <Container>
            <Heading
                title="My Events"
                subtitle="Your listed events are here"
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
                {listings.map((listing: any) => (
                    <EventCard
                        key={listing.id}
                        event={listing}
                        actionId={listing.id}
                        onAction={onDelete}
                        disabled={deletingId === listing.id}
                        actionLabel={deletingId === listing.id ? 'Deleting...' : 'Delete' }
                        currentUser={currentUser}
                    />
                ))}
            </div>
        </Container>
    );
}

export default PropertiesClient;