'use client';

import Image from "next/image";
import {useRouter} from "next/navigation";
import React, {useEffect, useState} from "react";

interface LogoProps {

}


const Logo: React.FC<LogoProps> = () => {
    const router = useRouter();
    const [isPhone, setIsPhone] = useState(false);
    const [isSmallScreen, setIsSmallScreen] = useState(false);

    const handleResize = () => {
        if (window.innerWidth < 768) {
            setIsPhone(true);
        } else {
            setIsPhone(false);
        }
    };

    const handleResizeTablet = () => {
        if (window.innerWidth <= 390) {
            setIsSmallScreen(true);
        } else {
            setIsSmallScreen(false);
        }
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        window.addEventListener('resize', handleResizeTablet);
        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('resize', handleResizeTablet);
        }
    }, [isPhone]);



    return (
        <Image
            onClick={() => router.push('/')}
            src='/images/logo1.png'
            alt="Logo"
            className={`
                ${isSmallScreen ? 'hidden' : 'block'}
                md:block
                cursor-pointer
                left-0
                `}
            width={isPhone ? 50 : 150}
            height={isPhone ? 50 : 150}
            sizes={isPhone ? '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw' : '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'}
        />
    )
};

export default Logo;
