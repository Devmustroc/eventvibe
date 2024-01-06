'use client';

import {CgMenuRound} from "react-icons/cg";
import Avatar from "@/app/components/Avatar";
import React, {useCallback, useEffect, useRef, useState} from "react";
import MenuItem from "@/app/components/navbar/MenuItem";
import useLoginModal from "@/app/hooks/useLoginModal";
import {signOut} from "next-auth/react";
import {useRouter} from "next/navigation";
import toast from "react-hot-toast";
import {SafeUser} from "@/app/types";
import useRentModal from "@/app/hooks/useRentModal";
import {FaPlus} from "react-icons/fa6";

interface UserMenuProps {
    currentUser?: SafeUser | null;
    scroll?: boolean;
}


const UserMenu: React.FC<UserMenuProps> = ({
    currentUser,
    scroll = false,
    }) => {
    const router = useRouter();

    const loginModal = useLoginModal();

    const rentModal = useRentModal();
    const node = useRef<HTMLDivElement>(null);

    const [isOpen, setIsOpen] = useState(false);



    const toggleOpen = useCallback(() => {
        setIsOpen((prevState) => !prevState);
    }, []);
    const handleLogout = useCallback(() => {
        signOut().then(() => {
            setTimeout(() => {
                toast.success("Logged out successfully");
                router.push("/");
            }, 5000);
            setIsOpen(false);
        });
    }, [router]);

    const onRent = useCallback(() => {
        if (!currentUser) {
            return loginModal.onOpen();
        }
        rentModal.onOpen();
    }, [currentUser, loginModal, rentModal]);



    useEffect(() => {
        document.addEventListener("mousedown", (event) => {
            if (node.current && !node.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        });
    }, []);


    return (
        <div
            className="
                relative
            "
        >
            <div
                className="
                    flex
                    flex-row
                    items-center
                    gap-3
                    cursor-pointer
                "
            >
                {currentUser ? (
                    <div
                        onClick={onRent}
                        className={`
                            md:block
                            text-sm
                            border-[1px]
                            border-gray-300
                            shadow-[3px_px_9px_#bdcbc4]
                            font-semibold
                            hover:shadow-md
                            py-3
                            px-4
                            rounded-full
                            hover:bg-brand_light
                            transition
                            uppercase
                            cursor-pointer        
                            `}

                    >
                        <FaPlus size={20}/>
                    </div>
                    ) : (
                    <div>
                    </div>
                )}
                <div
                    onClick={toggleOpen}
                    className={`
                        p-2
                        md:p-2
                        md:px-2
                        border-[1px]
                        border-brand_light
                        hover:bg-brand_light
                        shadow-[3px_3px_9px_#bdcbc4]
                        flex
                        flex-row
                        items-center
                        md:gap-3
                        gap-0
                        rounded-full
                        cursor-pointer
                        hover:shadow-md
                        transition
                        ${scroll ? 'bg-transparent '
                        :
                        'bg-white shadow-none'}
                        `}
                >
                    <CgMenuRound
                        size={20}
                        className={`
                            text-gray-900
                            ${isOpen ? 'transform rotate-90 display:block' +
                            '' : 'transform rotate-0'}
                        `}
                    />

                    <div
                        className="
                            hidden
                            md:block
                            text-sm
                            font-semibold
                            text-gray-900
                            justify-center
                        "
                    >
                        {currentUser?.name}
                    </div>
                    <Avatar
                        src={currentUser?.image}
                    />
                </div>
            </div>

            { isOpen && (
                <div
                    ref={node}
                    className="
                        absolute
                        top-0
                        right-0
                        mt-16
                        w-[40vw]
                        md:w-3/4
                        hover:text-brand_secondary
                        bg-brand_light
                        overflow-hidden
                        rounded-md
                        shadow-md
                        border
                        border-brand_light
                        z-10
                    "
                >
                    <div
                        className="
                            flex
                            flex-col
                            gap-3
                            cursor-pointer
                        "
                    >
                        {currentUser ? (
                            <>
                                <MenuItem  label="My Vibes" onClick={() => router.push("/vibes")} />
                                <MenuItem  label="My Favorites" onClick={() => router.push('./favorites')} />
                                <MenuItem  label="My reservations" onClick={() => router.push("/reservations")} />
                                <MenuItem  label="My Events" onClick={() => router.push('/myevent')} />
                                <MenuItem  label="Setting" onClick={() => router.push('/profile')}/>
                                <MenuItem  label="Log out" onClick={handleLogout} />

                            </>
                            ) : (
                            <div
                                ref={node}
                            >
                                <MenuItem  label="Log in" onClick={loginModal.onOpen} />
                            </div>
                        )}

                    </div>
                </div>
            )}
        </div>
    );
};

export default UserMenu;
