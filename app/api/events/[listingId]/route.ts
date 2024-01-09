import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";
import {redis} from "@/app/libs/redis";


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

    const cachedEvent = await redis.get(`listing:${listingId}`);

    if (cachedEvent) {
        return NextResponse.json(JSON.parse(cachedEvent));
    }

    const listing = await prisma.listing.findUnique({
        where: {
            id: listingId
        }
    });

    await redis.set(`listing:${listingId}`, JSON.stringify(listing));

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

    await redis.del(`listing:${listingId}`);

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