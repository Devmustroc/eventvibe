'use client';

import {useRouter} from "next/navigation";
import Heading from "@/app/components/Heading";
import Button from "@/app/components/Button";
import React from "react";

interface EmptyStateProps {
    title?: string;
    subtitle?: string;
    showReset?: boolean;
}



export const EmptyState: React.FC<EmptyStateProps> = ({
    title = "No results found",
    subtitle= "Try adjusting your search or filter to find what you're looking for.",
    showReset
    }) => {
    const router = useRouter();
    return (
        <div
            className="
                h-[60vh]
                flex
                flex-col
                gap-2
                justify-center
                items-center
            "
        >
            <Heading
                title={title}
                subtitle={subtitle}
                center
            />
            <div
                className="
                    w-48
                    mt-4
                "
            >
                {
                    showReset && (
                        <Button
                            outline
                            label="remove filters"
                            onClick={() => router.push('/')}
                        />
                    )
                }
            </div>

        </div>
    );
};
