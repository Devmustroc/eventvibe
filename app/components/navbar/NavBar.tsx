"use client";

import {Container} from "@/app/components/Container";
import Logo from "@/app/components/navbar/Logo";
import Search from "@/app/components/navbar/Search";
import UserMenu from "@/app/components/navbar/UserMenu";
import React, {useEffect, useState} from "react";
import {SafeUser} from "@/app/types";


interface NavBarProps {
    currentUser: SafeUser | null
}





export const NavBar: React.FC<NavBarProps> =  ({
    currentUser,
    }) => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const checkScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };

        window.addEventListener('scroll', checkScroll);
        return () => {
            window.removeEventListener('scroll', checkScroll);
        }
    }, []);

    return (
        <div
            className={`
                fixed
                w-full
                ${isScrolled ? 'bg-[#f1f0f2]' : 'bg-transparent'}
                z-50
                `}
        >
            <div
                className="
                    py-8
                    md:py-4
                "
            >
                <Container
                >
                    <div
                        className={`
                            flex
                            flex-row
                            items-center
                            pt-2
                            md:pt-5
                            w-full
                            justify-between
                            md:justify-between
                            gap-4
                            md:gap-4
                            xs:gap-1
                        `}
                    >
                        <Logo/>

                        <div
                            className="
                                flex
                                flex-row
                                justify-space-between
                                w-auto
                                gap-8
                            "
                        >
                            <Search />
                            <div
                                className="
                                    hidden
                                    md:block
                                "
                            >

                            </div>
                            <UserMenu
                                currentUser={currentUser}
                                scroll={isScrolled}
                            />
                        </div>
                    </div>
                </Container>
            </div>
        </div>
    );
};
