import prisma from "@/app/libs/prismadb";

interface IParams {
    listingId?: string;
    userId?: string;
    authorId?: string;
}

export default async function getReservation(params: IParams) {
    try {
        const {listingId, userId, authorId} = params;

        const query: any = {};

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

        return reservationCached;
    } catch (e: any) {
        throw new Error(e.message);
    }
}