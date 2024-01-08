"use client";

import React, {useCallback} from 'react';
import {SafeUser} from "@/app/types";
import useRentModal from "@/app/hooks/useRentModal";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import {useSearchParams} from "next/navigation";
import {Wrapper} from "@/app/components/wrapper";
import Image from "next/image";
import {categories} from "@/app/components/navbar/Categories";


interface HeroVideoProps {
    currentUser: SafeUser | null;
}

const HeroVideo: React.FC<HeroVideoProps> = ({
    currentUser ,
      }) => {

    const rentModal = useRentModal();
    const registerModal = useRegisterModal();
    const category = useSearchParams();

    const categoryValue = category?.get('category');

    const categoryItem = categories.find((category) => category.label === categoryValue);



    const onRent = useCallback(() => {
        if (!currentUser) {
            return registerModal.onOpen();
        } else {
            rentModal.onOpen();
        }
    }, [currentUser, registerModal, rentModal]);

    if (categoryValue !== null) {
        return (
            <div
                className="
                        flex
                        justify-center
                        items-center
                        pt-[100px]
                        pb-[100px]
                        bg-brand_whitea
                       "

            >
            <div
                className="
                        grid
                        grid-cols-1

                "
            >
                <Wrapper>
                    <div
                        className="
                        grid
                        grid-cols-1
                        items-center
                        md:grid-cols-2
                        px-[50px]
                        py-[50px]
                        shadowHero
                    "
                    >
                        <div>
                            <Image
                                src={`/icons/${categoryValue}.jpg`}
                                alt="hero"
                                width={300}
                                height={300}
                            />
                        </div>
                        <div
                            className="
                            flex
                            flex-col
                            justify-start
                            items-star
                            py-4
                            px-4
                        "
                        >
                            <h1
                                className="
                                h1-bold
                            "
                            >
                                {categoryValue}
                            </h1>
                            <p
                                className="
                                h2-regular
                                md:p-regular-24
                                text-xl
                                sm:text-lg
                                md:text-xl
                                text-start
                                text-slate-600
                            "
                            >
                                {categoryItem?.subtitle}
                            </p>
                        </div>
                    </div>
                </Wrapper>
            </div>
            </div>
        )
    }

    return (
        <div className="
                pt-20 sm:pt-32 md:pt-0
                relative
                w-full
                h-[70vh]
                overflow-hidden
                mb-[20px]
                border-b-[1px]
                shadow-sm
                items-start
            ">
            <video autoPlay muted loop className="absolute top-0 left-0 w-full h-full object-cover">
                <source src="/video/backgroundModal.mp4" type="video/mp4"/>
            </video>
            <div className="
                        absolute
                        flex
                        flex-col
                        justify-center
                        items-cente
                        inset-0
                        transform
                        text-center
                        text-white
                    ">
                <h1
                    className="
                       font-display
                       font-bold
                        text-3xl
                        sm:text-6xl
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
