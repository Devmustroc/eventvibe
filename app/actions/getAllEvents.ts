import {redis} from "@/lib/redis";
import prisma from "@/app/libs/prismadb";

export async function getAllEvents() {
    try {

        const cachedEvents = await redis.get('events');

        if (cachedEvents) {
            return JSON.parse(cachedEvents);
        }


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

        await redis.set('events', JSON.stringify(safeListings), 'EX', 60 * 60 * 24);

        return safeListings;
    }
    catch (error) {
        return [];
    }
}