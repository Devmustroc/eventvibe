import getCurrentUser from "@/app/actions/getCurrentUser";
import {NextResponse} from "next/server";
import prisma from "@/app/libs/prismadb";

interface IParams {
  reservationId: string;
}

export async function DELETE(
    request: Request,
    {params}: {params: IParams}
) {

    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error();
    }

    const {reservationId} = params;

    if (!reservationId) {
        throw new Error('Invalid ID');
    }

    const reservation = await prisma.reservation.delete({
        where: {
            id: reservationId,
        },
    });

    return NextResponse.json(reservation);
}

export async function GET(
    request: Request,
    {params}: {params: IParams}
) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error();
    }

    const {reservationId} = params;

    if (!reservationId) {
        throw new Error('Invalid ID');
    }

    const reservation = await prisma.reservation.findUnique({
        where: {
            id: reservationId,
        },
    });

    return NextResponse.json(reservation);
}
