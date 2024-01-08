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

     const existingReservation = await prisma.reservation.findUnique({
          where: {
              listingId_userId: {
                  listingId: eventId,
                  userId: currentUser.id,
              },
          },
      });

      if (existingReservation) {
          return NextResponse.error();
      }

      const reservation = await prisma.reservation.create({
          data: {
              listing: {
                  connect: {
                      id: eventId,
                  },
              },
              user: {
                  connect: {
                      id: currentUser.id,
                  },
              },
              startDate: new Date(startDate),
              endDate: new Date(endDate),
              totalPrice: parseInt(totalPrice, 10),
              numGuests: parseInt(numGuests, 10),
          },
      });

    return NextResponse.json(reservation)
}
