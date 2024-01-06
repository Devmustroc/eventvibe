import prisma from "@/app/libs/prismadb";
import {redis} from "@/lib/redis";

interface IParams {
    listingId?: string;
}

export async function getUsersForEvent(params: IParams) {
    try {

        const cachedUsers = await redis.get('users');

        if (cachedUsers) {
            return JSON.parse(cachedUsers);
        }

        const reservations = await prisma.reservation.findMany({
            where: {
                listingId: params.listingId,
            },
            include: {
                user: true,
            },
            orderBy: {
                createdAt: 'desc',
            },
        });

        const cachedReservation =  reservations.map((reservation) => {
            return {
                ...reservation.user,
                createdAt: reservation.user.createdAt.toString(),
                updatedAt: reservation.user.updatedAt.toString(),
            };
        });


        return cachedReservation;
    } catch (error: any) {
        throw new Error(error);
    }
}