import getCurrentUser from "@/app/actions/getCurrentUser";
import {NextResponse} from "next/server";
import prisma from "@/app/libs/prismadb";

interface IParams {
    listingId?: string;
}

export default async function getReservationsByUsers(params: IParams) {
    try {
        const currentUser = await getCurrentUser();

        if (!currentUser) {
            return NextResponse.error();
        }
        const { listingId } = params;

        if (!listingId) {
            return null;
        }

        const reservations = await prisma.reservation.findMany({
            where: {
                listingId,
                userId: currentUser.id,
            },
            include: {
                listing: true,
                user: true, // Include the user in the returned reservation object
            },
        });

        return reservations;
    }
    catch (error) {
        console.error(error);
        return null;
    }
}