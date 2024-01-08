import {NextResponse} from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

interface IParams {
    userId: string;
}

export async function PUT(
    request: Request,
    {params}: { params: IParams },
) {
    const currentUser = await getCurrentUser();
    const body = await request.json();
    const {
        email,
        name,
        age,
        image,
        firstName,
        lastName,
    } = body;

    if (!currentUser || currentUser.id !== params.userId) {
        return NextResponse.error();
    }

    try {
        const user = await prisma.user.update({
            where: {
                id: currentUser.id,
            },
            data: {
                email,
                name,
                age: parseInt(age, 10),
                image,
                firstName,
                lastName,
            },
        });

        return NextResponse.json(user);
    } catch (e) {
        return NextResponse.error();
    }
}

export async function DELETE(
    request: Request,
    {params}: { params: IParams },
) {
    const currentUser = await getCurrentUser();

    if (!currentUser || currentUser.id !== params.userId) {
        return NextResponse.error();
    }

    try {
        const user = await prisma.user.delete({
            where: {
                id: currentUser.id,
            },
        });

        return NextResponse.json(user);
    } catch (e) {
        return NextResponse.error();
    }
}