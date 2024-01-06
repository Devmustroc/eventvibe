import getCurrentUser from "@/app/actions/getCurrentUser";
import ClientOnly from "@/app/components/ClientOnly";
import {EmptyState} from "@/app/components/EmptyState";
import {getEvents} from "@/app/actions/getEvents";
import MyEventClient from "@/app/myevent/MyEventClient";


export const revalidate = 0

const MyEventPage = async () => {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return (
            <ClientOnly>
                <EmptyState
                    title="No Event Found, User Unauthenticated"
                    subtitle='Please login to view your Event.'
                />
            </ClientOnly>
        )
    }

    const listing = await getEvents({userId: currentUser.id});

    if (!listing) {
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
            <MyEventClient
                listings={listing}
                currentUser={currentUser}
            />
        </ClientOnly>
        </div>
    )
}

export default MyEventPage;