'use client';

import {IconType} from "react-icons";
import {useRouter, useSearchParams} from "next/navigation";
import React, {useCallback} from "react";
import querystring from "query-string";



interface CategoryBoxProps {
    label: string;
    icon: IconType;
    selected?: boolean;
}


const CategoryBox: React.FC<CategoryBoxProps> = ({
    label,
    icon: Icon,
    selected
    }) => {
    const router = useRouter();
    const params = useSearchParams();


    const handleClick = useCallback(() => {
        let currentQuery = {};
        if (params) {
            currentQuery = querystring.parse(params.toString());
        }
        const updateQuery: any = {
            ...currentQuery,
            category: label
        };

        if (params?.get('category') === label) {
            delete updateQuery.category;
        }

        const url: any = querystring.stringifyUrl({
            url: '/',
            query: updateQuery
        });

        router.push(url);
    }, [label, params, router]);
    return (
        <div
            onClick={handleClick}
            className={`
                flex 
                flex-col
                items-center
                gap-2
                justify-center 
                rounded-xl
                px-5
                py-4
                border-b-2
                hover:text-brand_secondary
                hover:bg-brand_primary
                hover:border-brand_primary
                hover:shadow-[2px_2px_4px_#00FAF2]
                hover:transition-transform duration-200 ease-in-out transform hover:scale-125"
                transition
                cursor-pointer
                ${selected ? "border-brand_primary text-brand_primary bg-brand_secondary"
                : "border-transparent text-brand_gray hover:border-brand_primary hover:text-brand_primary"}
                
            `}

        >
             <Icon
                  size={30}
             />
            <div
                className="
                    text-sm
                    font-semibold
                "
            >
                {label}
            </div>
        </div>
    );
};

export default CategoryBox;

