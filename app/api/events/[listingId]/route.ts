import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";
import {redis} from "@/lib/redis";

interface IParams {
    listingId?: string;
}

export async function GET(
    request: Request,
    { params }: { params: IParams }
) {
    const currentUser = await getCurrentUser();


    if (!currentUser) {
        return NextResponse.error();
    }

    const { listingId } = params;

    if (!listingId) {
        throw new Error('Invalid ID');
    }

    const cachedListing = await redis.get('listing');

    if (cachedListing) {
        return NextResponse.json(JSON.parse(cachedListing));
    }

    const listing = await prisma.listing.findUnique({
        where: {
            id: listingId
        }
    });

    await redis.set('listing', JSON.stringify(listing), 'EX', 60 * 60 * 24);

    return NextResponse.json(listing);
}

export async function DELETE(
    request: Request,
    { params }: { params: IParams }
) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error();
    }

    const { listingId } = params;

    if (!listingId) {
        throw new Error('Invalid ID');
    }

    // First, delete or [listingId] the reservations that reference the listing
    await prisma.reservation.deleteMany({
        where: {
            listingId: listingId
        }
    })

    // Then, delete the listing
    const listing = await prisma.listing.deleteMany({
        where: {
            id: listingId,
            userId: currentUser.id
        }
    });

    return NextResponse.json(listing);
}

export async function PUT(
    request: Request,
    { params }: { params: IParams }
) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error();
    }

    const { listingId } = params;

    if (!listingId) {
        throw new Error('Invalid ID');
    }

    const body = await request.json();
    const {
        title,
        description,
        price,
        category,
        startDate,
        endDate,
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

    const listing = await prisma.listing.update({
        where: {
            id: listingId,
            userId: currentUser.id
        },
        data: {
            title,
            description,
            price: parseInt(price, 10),
            category,
            locationValue: body.location.value,
            imageSrc,
            guestCount,
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