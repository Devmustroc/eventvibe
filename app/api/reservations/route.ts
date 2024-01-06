import getCurrentUser from "@/app/actions/getCurrentUser";
import {NextResponse} from "next/server";
import prisma from "@/app/libs/prismadb";

export async function POST(
    request: Request
) {
     const currentUser = await getCurrentUser();

     if (!currentUser) {
         return NextResponse.error();
     }

     const body = await request.json();

     const {
         eventId,
         startDate,
         endDate,
         totalPrice,
         numGuests,
     } = body;
     if (!eventId || !startDate || !endDate || !totalPrice || !numGuests) {
         return NextResponse.error();
     }

     const eventAndReservations = await prisma.listing.update({
         where: {
             id: eventId,
         },
         data: {
             reservation: {
                 create: {
                     userId: currentUser.id,
                     startDate,
                     endDate,
                     totalPrice,
                     numGuests
                 }
             }
         }
     })


    return NextResponse.json(eventAndReservations)
}
