export { default } from "next-auth/middleware";

export const config = {
    matcher: [
        '/vibes',
        "/reservations",
        "/events",
        "/events/[listingId]",
        '/favorites',
    ]
}
