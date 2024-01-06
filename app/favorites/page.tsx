import ClientOnly from "@/app/components/ClientOnly";
import {EmptyState} from "@/app/components/EmptyState";
import getFavoriteEvents from "@/app/actions/getFavoriteEvents";
import getCurrentUser from "@/app/actions/getCurrentUser";
import {FavoritesClient} from "@/app/favorites/FavoritesClient";

export const revalidate = 0

const FavoritesPage = async () => {
    const event = await getFavoriteEvents();
    const currentUser = await getCurrentUser();


    if (!event || !currentUser) {
        return (
            <div
                className="
            pt-[100px]
            md:pt-[150px]
            "

            >
                <ClientOnly>
                    <EmptyState
                        title="You have no favorites"
                        subtitle="Please Choose your favorites Vibes"
                    />
                </ClientOnly>
            </div>
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
            <FavoritesClient
                event={event}
                currentUser={currentUser}
            />
        </ClientOnly>
        </div>
    )
};

export default FavoritesPage;