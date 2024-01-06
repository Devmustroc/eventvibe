import prisma from "@/app/libs/prismadb";
import {redis} from "@/lib/redis";

export interface IEventParams {
    userId?: string;
    guestCount?: number;
    startDate?: string;
    endDate?: string;
    locationValue?: string;
    category?: string;
    city?: string;
    zipCode?: string;
}

export async function getEvents(params: IEventParams) {
    try {
        const {
            userId,
            guestCount,
            locationValue,
            category,
            city,
            zipCode,
        } = params;

        let query: any = {};

        const cachedEvents = await redis.get('events');

        if (cachedEvents) {
            return JSON.parse(cachedEvents);
        }

        if (userId) {
            query.userId = userId;
        }

        if (category) {
            query.category = category;
        }



        if (city) {
            query.city = city;
        }

        if (zipCode) {
            query.zipCode = zipCode;
        }

        if (guestCount) {
            query.guestCount = {
                gte: +guestCount
            }
        }

        if (locationValue) {
            query.locationValue = locationValue;
        }

        if (city && zipCode) {
            query.AND = [
                {
                    city
                },
                {
                    zipCode
                }
            ]
        }

        if (city && zipCode && locationValue) {
            query.AND = [
                {
                    city
                },
                {
                    zipCode
                },
                {
                    locationValue
                }
            ]
        }


        const events = await prisma.listing.findMany({
            where: query,
            orderBy: {
                createdAt: 'desc'
            },
        });

        const eventsForCache = events.map((event) => ({
            ...event,
            createdAt: event.createdAt.toISOString(),
            startDate: event.startDate.toISOString(),
            endDate: event.endDate.toISOString(),
        }));

        await redis.set('events', JSON.stringify(eventsForCache), 'EX', 60 * 60 * 24);
    } catch (error: any) {
        throw new Error(error);
    }
}