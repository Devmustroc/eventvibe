'use client';

import {BiSearch} from "react-icons/bi";
import useSearchModal from "@/app/hooks/useSearchModal";

const Search = () => {
    const searchModal = useSearchModal();

    return (
        <div
            onClick={searchModal.onOpen}
            className={`
                    relative
                    flex
                    flex-row
                    items-center
                    justify-center
                    rounded-full
                    cursor-pointer

             `}>
                    <div
                            className="
                                    bg-white
                                    w-full
                                    h-full
                                    items-center
                                    flex
                                    justify-center
                                    rounded-full
                                    py-3.5
                                    px-3.5
                                    md:px-2.5
                                    md:py-2.5
                                    hover:bg-brand_secondary

                                    "
                    >
                            <BiSearch
                                className="
                                    text-xl
                                    md:text-3xl
                                    text-brand_secondary
                                    hover:text-brand_primary
                                    "
                            />
                    </div>
            </div>
    );
};
export default Search;
