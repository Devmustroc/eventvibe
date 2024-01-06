'use client';

import {Container} from "@/app/components/Container";
import {TbMusicStar} from "react-icons/tb";
import {MdCastForEducation, MdFitnessCenter, MdNaturePeople} from "react-icons/md";
import CategoryBox from "@/app/components/CategoryBox";
import {usePathname, useSearchParams} from "next/navigation";
import { FaPaintBrush,} from "react-icons/fa";
import {FaCameraRetro, FaLanguage, FaPeoplePulling} from "react-icons/fa6";
import {GiCookingPot} from "react-icons/gi";
import {GrTechnology, GrYoga} from "react-icons/gr";
import {TiBusinessCard} from "react-icons/ti";
import {RiSlideshow2Fill} from "react-icons/ri";
import {SiYoutubegaming} from "react-icons/si";


export const categories = [
    {
        label: "Dance",
        icon: FaPeoplePulling,
        description: "Dance event, Workshops, Dance classes, competitions"
    },
    {
        label: "Music",
        icon: TbMusicStar,
        description: "Music event, Workshops, Music classes, competitions"
    },
    {
        label: "Fitness",
        icon: MdFitnessCenter,
        description: "Fitness event, Workshops, Fitness classes, Fitness competitions"
    },
    {
        label: "Art",
        icon: FaPaintBrush,
        description: "exposition, Workshops, Art classes, Art Competitions",
    },
    {
        label: "Cooking",
        icon: GiCookingPot,
        description: "Cooking event, Workshops, Cooking classes, Cooking Competitions"
    },
    {
        label: "Tech",
        icon: GrTechnology,
        description: "Tech event, Salon, Workshops, Tech classes, Tech Competitions"
    },
    {
        label: 'Gaming',
        icon: SiYoutubegaming,
        description: "Gaming event, Workshops, Gaming classes, Gaming Competitions"
    },
    {
        label: "Wellness",
        icon: GrYoga,
        description: "Wellness event, Meditation, Workshops, Wellness classes"
    },
    {
        label: "Language",
        icon: FaLanguage,
        description: "Language event, Workshops, Language classes, Language Competitions"
    },
    {
        label: "Photography",
        icon: FaCameraRetro,
        description: "Photography event,Exposition , Workshops, Photography classes, Photography Competitions"
    },
    {
        label: "Networking",
        icon: TiBusinessCard,
        description: "Networking event, Salon,Workshops, Networking classes, Networking Competitions"
    },
    {
        label: "Educational",
        icon: MdCastForEducation,
        description: "Educational event, Workshops, Educational classes, Educational Competitions"
    },
    {
        label: "Entertainment",
        icon: RiSlideshow2Fill,
        description: "Entertainment event, Workshops, Entertainment classes, Entertainment Competitions"
    },
    {
        label: "Gardening",
        icon: MdNaturePeople,
        description: "Gardening event, Workshops, Gardening classes, Gardening Competitions"
    }

];

const Categories = () => {
    const params = useSearchParams();
    const categoryItem = params?.get('category');
    const pathname =  usePathname();


    const isMainPage = pathname === '/';

    if (!isMainPage) {
        return null;
    }


    return (
        <Container>
            <div
                className={`
                        pt-4
                        flex
                        flex-row
                        items-center
                        justify-between
                        overflow-x-auto
                        whitespace-nowrap
                        scrollbar-hide
                        md:scrollbar-hide
                        relative
                `}
            >
                {
                    categories.map((category) => (
                        <CategoryBox
                            key={category.label}
                            label={category.label}
                            icon={category.icon}
                            selected={category.label === categoryItem}

                        />
                    ))
                }
            </div>
        </Container>
    );
};

export default Categories;
