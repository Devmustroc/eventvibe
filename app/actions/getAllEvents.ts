import prisma from "@/app/libs/prismadb";


export async function getAllEvents() {
    try {

        const events = await prisma.listing.findMany({
            where: {
                startDate: {
                    gte: new Date(),
                },
            },
            orderBy: {
                startDate: 'asc',
            },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        image: true,
                    },
                },
                reservation: {
                    select: {
                        id: true,
                        userId: true,
                    },
                },
            },
        });
        const safeListings = events.map((event) => ({
            ...event,
            startDate: event.startDate.toISOString(),
            endDate: event.endDate.toISOString(),
            createdAt: event.createdAt.toISOString(),
        }));


        return safeListings;
    }
    catch (error) {
        return [];
    }
}