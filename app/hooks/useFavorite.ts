import {SafeUser} from "@/app/types";
import {useRouter} from "next/navigation";
import useLoginModal from "@/app/hooks/useLoginModal";
import React, {useCallback, useMemo} from "react";
import axios from "axios";
import toast from "react-hot-toast";


interface IUseFavorite {
    organizerId: string;
    currentUser?: SafeUser | null;
}

const useFavorite = ({
     organizerId,
     currentUser
     }: IUseFavorite) => {
    const router = useRouter();
    const loginModal = useLoginModal();

    const hasFavorite = useMemo(() => {
        const list = currentUser?.favoriteIds || [];
        return list.includes(organizerId);
    }, [currentUser, organizerId]);

    const toggleFavorite = useCallback(async (
        e: React.MouseEvent<HTMLDivElement>
    ) => {
        e.stopPropagation();

        if (!currentUser) {
            loginModal.onOpen();
            return;
        }

        try {
            let request;
            if (hasFavorite) {
                request = () => axios.delete(`/api/favorites/${organizerId}`);
            } else {
                request = () => axios.post(`/api/favorites/${organizerId}`);
            }
            await request();
            router.refresh();
            toast.success("Success!");
        } catch (error: any) {
            toast.error(error.response.data.message);
        }

    }, [
        organizerId,
        currentUser,
        hasFavorite,
        loginModal,
        router
    ]);

    return {
        hasFavorite,
        toggleFavorite
    }
};

export default useFavorite;