import prisma from "@/app/libs/prismadb";

import getCurrentUser from "./getCurrentUser";
import {redis} from "@/lib/redis";

export default async function getFavoriteListings() {
    try {
        const currentUser = await getCurrentUser();

        const cachedFavorites =await redis.get('favorites');

        if (cachedFavorites) {
            return JSON.parse(cachedFavorites);
        }

        if (!currentUser) {
            return [];
        }

        const favorites = await prisma.listing.findMany({
            where: {
                id: {
                    in: [...(currentUser.favoriteIds || [])]
                }
            }
        });

        const safeFavorites = favorites.map((favorite) => ({
            ...favorite,
            createdAt: favorite.createdAt.toISOString(),
            startDate: favorite.startDate.toISOString(),
            endDate: favorite.endDate.toISOString(),
        }));

        await redis.set('favorites', JSON.stringify(safeFavorites), 'EX', 60 * 60 * 24);

        return safeFavorites;
    } catch (error: any) {
        throw new Error(error);
    }
}