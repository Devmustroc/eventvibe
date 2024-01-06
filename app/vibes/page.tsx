import getCurrentUser from "@/app/actions/getCurrentUser";
import ClientOnly from "@/app/components/ClientOnly";
import {EmptyState} from "@/app/components/EmptyState";
import getReservation from "@/app/actions/getReservation";
import VibesClient from "@/app/vibes/VibesClient";


export const revalidate = 0

const VibePage = async () => {
    const currentUser = await getCurrentUser();
    const reservations = await getReservation({userId: currentUser?.id});

    if (!currentUser) {
        return (
            <ClientOnly>
                <EmptyState
                    title="No vibes, User Unauthenticated"
                    subtitle='Please login to view your vibes.'
                />
            </ClientOnly>
        )
    }



    if (!reservations) {
        return (
            <ClientOnly>
                <EmptyState
                    title="No vibes, Founded"
                    subtitle='Create a vibe to get started.'
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
            <VibesClient
                reservations={reservations}
                currentUser={currentUser}
            />
        </ClientOnly>
        </div>
    )
}

export default VibePage;