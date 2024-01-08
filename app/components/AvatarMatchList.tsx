import {SafeUser} from "@/app/types";
import React from "react";

interface AvatarMatchListProps {
    userMatch?: SafeUser[];
}



export const AvatarMatchList: React.FC<AvatarMatchListProps> = ({
                                                                    userMatch
                                                                }) => {
    return (
        <div className="flex -space-x-4 rtl:space-x-reverse">
            {Array.isArray(userMatch) && userMatch.map((user) => (
                <img
                    key={user.id}
                    className="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800"
                    src={user.image || "/images/placeholder-min.png"}
                    alt={user.name || "User Name"}
                />
            ))}
        </div>

    );
};
