import getCurrentUser from "@/app/actions/getCurrentUser";
import ClientOnly from "@/app/components/ClientOnly";
import {EmptyState} from "@/app/components/EmptyState";
import getReservation from "@/app/actions/getReservation";
import {ReservationClient} from "@/app/reservations/ReservationClient";

export const revalidate = 0

const reservationsPage = async () => {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return (
            <ClientOnly>
                <EmptyState
                    title="You are not logged in"
                    subtitle="Please login to view your reservations"
               />
            </ClientOnly>
        )
    }

    const reservation = await getReservation({
        authorId: currentUser.id
    })

    if (!reservation) {
        return (
            <ClientOnly>
                <EmptyState
                    title="You have no reservations"
                    subtitle="Please create a reservation"
                />
            </ClientOnly>
        )
    }

    return (
        <div
            className="
            pt-[100px]
            md:pt-[150px]

            "
        >
        <ClientOnly>
            <ReservationClient
                reservation={reservation}
                currentUser={currentUser}
            />
        </ClientOnly>
        </div>

    )
};

export default reservationsPage;
