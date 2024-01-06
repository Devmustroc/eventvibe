export { default } from "next-auth/middleware";

export const config = {
    matcher: [
        '/vibes',
        "/reservations",
        "/events",
        '/favorites',
        '/myevent',
    ]
}
