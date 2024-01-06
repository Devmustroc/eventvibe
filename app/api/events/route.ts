import getCurrentUser from "@/app/actions/getCurrentUser";
import {NextResponse} from "next/server";
import prisma from "@/app/libs/prismadb";

export async function POST(
    request: Request,
) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error();
    }

    const body = await request.json();
    const {
        title,
        description,
        price,
        category,
        startDate,
        endDate,
        location,
        imageSrc,
        guestCount,
        address,
        city,
        zipcode,
    } = body;

    Object.keys(body).forEach((value: any) => {
        if (!body[value]) {
            return NextResponse.error();
        }
    });


    const listing = await prisma.listing.create({
        data: {
            title,
            description,
            price: parseInt(price, 10),
            category,
            locationValue: location.value,
            imageSrc,
            guestCount,
            userId: currentUser.id,
            startDate: new Date(startDate),
            endDate: new Date(endDate),
            remaingPlaces: guestCount,
            address,
            city,
            zipcode,
        },
    });

    return NextResponse.json(listing);
}