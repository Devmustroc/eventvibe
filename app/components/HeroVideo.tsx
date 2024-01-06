'use client';

import React, {useCallback} from 'react';
import {SafeUser} from "@/app/types";
import useRentModal from "@/app/hooks/useRentModal";
import useRegisterModal from "@/app/hooks/useRegisterModal";


interface HeroVideoProps {
    currentUser: SafeUser | null;
}

const HeroVideo: React.FC<HeroVideoProps> = ({
    currentUser ,
      }) => {

    const rentModal = useRentModal();
    const registerModal = useRegisterModal();

    const onRent = useCallback(() => {
        if (!currentUser) {
            return registerModal.onOpen();
        } else {
            rentModal.onOpen();
        }
    }, [currentUser, registerModal, rentModal]);

    return (
        <div className="
                pt-20 sm:pt-32 md:pt-0
                relative
                w-full
                h-[50vh]
                overflow-hidden
                mb-[20px]
                border-b-[1px]
                shadow-sm
                items-start
            ">
            <video autoPlay muted loop className="absolute top-0 left-0 w-full h-full object-cover">
                <source src="/video/backgroundModal.mp4" type="video/mp4"/>
                Your browser does not support the video tag.
            </video>
            <div className="
                        absolute
                        flex
                        flex-col
                        justify-start
                        items-start
                        bottom-4
                        left-4
                        transform
                        text-center
                        text-white
                    ">
                <h1
                    className="
                       h1-bold
                        "
                >
                    Celebrate your special day with us
                </h1>
                <p
                    className="
                        h2-regular
                        md:p-regular-24
                        text-xl sm:text-lg md:text-xl
            "
                >
                    Share your special day with your loved ones and let us take care of the rest.
                </p>
                <div
                    className="
                        flex-center
                        gap-4
                        mt-4
                    "
                >
                    <button
                        onClick={onRent}
                        className="
                        mt-4
                        text-md
                        text-white
                        bg-brand_secondary
                        hover:bg-brand_primary
                        hover:text-brand_secondary
                        focus:outline-none
                        focus:ring-2
                        focus:ring-blue-600
                        focus:ring-opacity-50
                        rounded-md
                        px-4
                        py-2
                        transition
                        duration-300
                        ease-in-out
                        mb-4
                    "
                    >
                        Share your event
                    </button>
                </div>

            </div>
        </div>
    );
};

export default HeroVideo;
