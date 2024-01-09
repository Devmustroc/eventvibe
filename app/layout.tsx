import type { Metadata } from 'next'
import {Nunito} from 'next/font/google'
import './globals.css'
import {NavBar} from "@/app/components/navbar/NavBar";
import RegisterModal from "@/app/components/modals/RegisterModal";
import React from "react";
import ToasterProvider from "@/app/providers/ToasterProvider";
import LoginModal from "@/app/components/modals/LoginModal";
import getCurrentUser from "@/app/actions/getCurrentUser";
import {BookModal} from "@/app/components/modals/bookModal";
import ClientOnly from "@/app/components/ClientOnly";
import {SearchModal} from "@/app/components/modals/SearchModal";
import {Footer} from "@/app/components/Footer/Footer";
import UpdateModal from "@/app/components/modals/UpdateModal";



const font1 = Nunito({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Event Vibe',
  description: 'Event Vibe is a platform for event organizers to create and manage events.',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
    const currentUser = await getCurrentUser();



    return (
        <html lang="en">
        <body className={font1.className}>
        <ClientOnly>
            <ToasterProvider/>
            <LoginModal/>
            <RegisterModal/>
            <UpdateModal/>
            <SearchModal/>
            <BookModal/>
        </ClientOnly>
        <NavBar currentUser={currentUser}/>
        <div
            className="
                pt-[100px]
                "
        >
            {children}
        </div>
        <div
            className="
                bottom-0
                mt-[100px]
                "
        >
            <hr
                className="
                border-[1px]
                border-[#e4e4e4]
                w-[100%]
                my-[20px]
                md:my-[20px]
                "
            />
            <ClientOnly>
                <Footer/>
            </ClientOnly>
        </div>
        </body>
        </html>
    )
}
