import prisma from "@/app/libs/prismadb";
import {redis} from "@/lib/redis";

interface IParams {
    listingId?: string;
    userId?: string;
    authorId?: string;
}

export default async function getReservation(params: IParams) {
    try {
        const {listingId, userId, authorId} = params;

        const query: any = {};

        const cachedReservations = await redis.get('reservations');

        if (cachedReservations) {
            return JSON.parse(cachedReservations);
        }

        if (listingId) {
            query.listingId = listingId;
        }

        if (userId) {
            query.userId = userId;
        }

        if (authorId) {
            query.listing = { userId: authorId };
        }

        const reservations = await prisma?.reservation.findMany({
            where: query,
            include: {
                listing: true,
            },
            orderBy: {
                createdAt: 'desc',
            },
        });

        const reservationCached =  reservations.map((reservation) => ({
                ...reservation,
                createdAt: reservation.createdAt.toISOString(),
                startDate: reservation.startDate.toISOString(),
                endDate: reservation.endDate.toISOString(),
                listing: {
                    ...reservation.listing,
                    createdAt: reservation.listing.createdAt.toISOString(),
                    startDate: reservation.listing.startDate.toISOString(),
                    endDate: reservation.listing.endDate.toISOString(),
                },
            })
        );

        await redis.set('reservations', JSON.stringify(reservationCached), 'EX', 60 * 60 * 24);

        return reservationCached;
    } catch (e: any) {
        throw new Error(e.message);
    }
}