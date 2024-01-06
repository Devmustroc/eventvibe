import prisma from "@/app/libs/prismadb";
import {redis} from "@/lib/redis";

interface IParams {
    listingId?: string;
}

export default async function getListingById(
    params: IParams
) {
    try {
        const { listingId } = params;

        const cachedEvent = await redis.get(`listing:${listingId}`);

        if (cachedEvent) {
            return JSON.parse(cachedEvent);
        }

        const listing = await prisma.listing.findUnique({
            where: {
                id: listingId,
            },
            include: {
                user: true
            }
        });

        if (!listing) {
            return null;
        }

        const event = {
            ...listing,
            createdAt: listing.createdAt.toString(),
            startDate: listing.startDate.toString(),
            endDate: listing.endDate.toString(),
            user: {
                ...listing.user,
                createdAt: listing.user.createdAt.toString(),
                updatedAt: listing.user.updatedAt.toString(),
            }
        };

        await redis.set(`listing:${listingId}`, JSON.stringify(event), 'EX', 60 * 60 * 24);

        return event;
    } catch (error: any) {
        throw new Error(error);
    }
}