import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";
import {redis} from "@/app/libs/redis";


interface IParams {
    organizerId?: string;
}

export async function POST(
    request: Request,
    { params }: { params: IParams }
){
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error();
    }
    const { organizerId } = params || {};

    if (!organizerId ) {
       return NextResponse.error();
    }
    let favoriteIds = [...(currentUser?.favoriteIds || [])];


    favoriteIds.push(organizerId)



    const user = await prisma.user.update({
        where: {
            id: currentUser?.id,
        },
        data: {
            favoriteIds,
        },
    });

    await redis.set(`favorite:${organizerId}`, JSON.stringify(user));
    return NextResponse.json(user);
}

export async function DELETE(
    request: Request,
    { params }: { params: IParams }
){
    const currentUser = await getCurrentUser();

    if (!currentUser) {
       return NextResponse.error();
    }

    const { organizerId } = params;

    if (!organizerId) {
        return NextResponse.error();
    }

    let favoriteIds = [...(currentUser?.favoriteIds || [])];

    favoriteIds = favoriteIds.filter((id) => id !== organizerId);

    const user = await prisma.user.update({
        where: {
            id: currentUser?.id,
        },
        data: {
            favoriteIds,
        },
    });

    await redis.del(`favorite:${organizerId}`);

    return NextResponse.json(user);
}