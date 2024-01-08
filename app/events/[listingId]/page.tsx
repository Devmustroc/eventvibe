import getEventById from "@/app/actions/getEventById";
import ClientOnly from "@/app/components/ClientOnly";
import {EmptyState} from "@/app/components/EmptyState";
import getReservation from "../../actions/getReservation";
import EventClient from "@/app/events/[listingId]/EventClient";
import {getUsersForEvent} from "@/app/actions/getUsersForEvent";
import getCurrentUser from "@/app/actions/getCurrentUser";


interface IParams {
    listingId: string;
}


const EventIdPage = async ({params} : {params: IParams}) => {
    const event = await getEventById(params);
    const reservations = await getReservation(params);
    const userMatch = await getUsersForEvent(params);
    const currentUser = await getCurrentUser();



    if (!event) {
        return (
            <ClientOnly>
                <EmptyState />
            </ClientOnly>
        )
    }
    return (
        <ClientOnly>
            <ClientOnly>
                <EventClient
                    event={event}
                    reservations={reservations}
                    userMatch={userMatch}
                    currentUser={currentUser}
                />
            </ClientOnly>
        </ClientOnly>
    );
};

export default EventIdPage;
