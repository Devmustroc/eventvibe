import {User, Listing, Reservation} from ".prisma/client";

export type SafeEvent = Omit<
    Listing,
    "createdAt" | "startDate" | "endDate"
> & {
    createdAt: string;
    startDate: string;
    endDate: string;
};

export type SafeReservation = Omit<
    Reservation,
    "createdAt" | "startDate" | "endDate" | "listing"
> & {
    createdAt: string;
    startDate: string;
    endDate: string;
    listing: SafeEvent;
};



export type SafeUser = Omit<
    User,
    "createdAt" | "updatedAt"
> & {
    createdAt: string;
    updatedAt: string;
};

