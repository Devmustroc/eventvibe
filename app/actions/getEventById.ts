import prisma from "@/app/libs/prismadb";


interface IParams {
    listingId?: string;
}

export default async function getListingById(
    params: IParams
) {
    try {
        const { listingId } = params;


        const listing = await prisma.listing.findUnique({
            where: {
                id: listingId,
            },
            include: {
                user: true
            }
        });

        if (!listing) {
            return null;
        }

        const event = {
            ...listing,
            createdAt: listing.createdAt.toString(),
            startDate: listing.startDate.toString(),
            endDate: listing.endDate.toString(),
            user: {
                ...listing.user,
                createdAt: listing.user.createdAt.toString(),
                updatedAt: listing.user.updatedAt.toString(),
            }
        };


        return event;
    } catch (error: any) {
        throw new Error(error);
    }
}