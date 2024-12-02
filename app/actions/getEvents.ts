import prisma from "@/app/libs/prismadb";

export interface GetEventsParams {
    organizerId?: string;
    category?: string;
    locationValue?: string;
}

export default async function getEvents(params: GetEventsParams) {
    try {
        const { organizerId, category, locationValue } = params;

        let query: any = {};

        if (organizerId) {
            query.organizerId = organizerId;
        }

        if (category) {
            query.category = category;
        }

        if (locationValue) {
            query.locationValue = locationValue;
        }

        const events = await prisma.event.findMany({
            where: query,
            orderBy: {
                createdAt: 'desc'
            }
        });

        return events;
    } catch (error: any) {
        throw new Error(error);
    }
}