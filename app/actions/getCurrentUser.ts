import {getServerSession} from "next-auth";
import {authOptions} from "@/pages/api/auth/[...nextauth]";
import prisma from "@/app/libs/prismadb";


export async function getSession () {
    return await getServerSession(authOptions)
}

const getCurrentUser = async () => {
    try {
        const session = await getSession();

        if (!session?.user?.email) {
            return null;
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


        return safeUser;
    } catch (error: any) {
        return null;
    }
};

export default getCurrentUser;