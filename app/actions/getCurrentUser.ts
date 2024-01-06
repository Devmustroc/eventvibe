import {getServerSession} from "next-auth";
import {authOptions} from "@/pages/api/auth/[...nextauth]";
import prisma from "@/app/libs/prismadb";
import {redis} from "@/lib/redis";

export async function getSession () {
    return await getServerSession(authOptions)
}

const getCurrentUser = async () => {
    try {
        const session = await getSession();

        if (!session?.user?.email) {
            return null;
        }

        const cachedUser = await redis.get(session.user.email);

        if (cachedUser) {
            return JSON.parse(cachedUser);
        }

        const currentUser = await prisma.user.findUnique({
            where: {email: session.user.email},
        });

        if (!currentUser) {
            return null;
        }
        if (currentUser && !currentUser.image) {
            currentUser.image = '';
        }
        if(currentUser && !currentUser.emailVerified) {
            currentUser.emailVerified = null;
        }

        const safeUser = {
            ...currentUser,
            image: currentUser.image || null,
            createdAt: currentUser.createdAt.toISOString(),
            updatedAt: currentUser.updatedAt.toISOString(),
            emailVerified: currentUser.emailVerified || null,
        };

        await redis.set(session.user.email, JSON.stringify(safeUser), 'EX', 60 * 60 * 24);

        return safeUser;
    } catch (error: any) {
        return null;
    }
};

export default getCurrentUser;