'use client';

import Image from "next/image";
import {SafeUser} from "@/app/types";
import React, {useCallback} from "react";
import useRentModal from "@/app/hooks/useRentModal";
import useRegisterModal from "@/app/hooks/useRegisterModal";

interface HeroProps {
    currentUser: SafeUser | null;
}


export const Hero: React.FC<HeroProps> = ({
    currentUser
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
        <>
            <section
                className="
                bg-primary-50
                bg-dotted-pattern
                bg-contain
                py-20
                md:py-10
                ">
                <div
                    className="
                    wrapper
                    grid
                    grid-cols-1
                    gap-10
                    sm:grid-cols-2
                    md:grid-cols-2
                    "
                >
                    <div
                        className="
                        flex
                        flex-col
                        justify-center
                        gap-8
                        "

                    >
                        <h1
                            className="
                               h1-bold
                            "
                        >
                            Celebrate your special day with us,
                        </h1>
                        <p
                            className="
                                p-regular-20
                                md:p-regular-24
                                "
                        >
                            Share your special day with your loved ones and let us take care of the rest.
                        </p>
                        <button
                            onClick={onRent}
                            className="
                                button
                                bg-brand_secondary
                                text-white
                                md:w-1/2
                            "
                        >
                            {currentUser ? "Share your event" : "Join us"}
                        </button>
                    </div>
                    <Image
                        src="/images/hero.png"
                        alt="hero"
                        width={1000}
                        height={1000}
                        className="
                            max-h-[70vh]
                            object-contain
                            object-center
                            2xl:max-h-[50vh]
                            "
                    />
                </div>

            </section>
        </>
    );
};
