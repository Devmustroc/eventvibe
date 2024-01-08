'use client';

import {Container} from "@/app/components/Container";
import {TbMusicStar} from "react-icons/tb";
import {MdCastForEducation, MdFitnessCenter, MdNaturePeople} from "react-icons/md";
import CategoryBox from "@/app/components/CategoryBox";
import {usePathname,  useSearchParams} from "next/navigation";
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
        description: "Dance event, Workshops, Dance classes, competitions",
        subtitle: "Feel the Rhythm, Share the Magic. Your dance event, an enchanting story we help unfold. Share your special Dance event with your loved ones and let us take care of the rest."
    },
    {
        label: "Music",
        icon: TbMusicStar,
        description: "Music event, Workshops, Music classes, competitions",
        subtitle: "Harmony Unleashed, Melodies Explored. Your musical odyssey awaits, an immersive journey curated just for you. Share your enchanting Music event, and let the symphony of memories begin."
    },
    {
        label: "Fitness",
        icon: MdFitnessCenter,
        description: "Fitness event, Workshops, Fitness classes, Fitness competitions",
        subtitle: "Unlock Your Potential, Embrace the Wellness Within. Your fitness adventure starts here, a transformative journey of self-discovery. Share your invigorating Fitness event, and let the wellness story unfold."
    },
    {
        label: "Art",
        icon: FaPaintBrush,
        description: "exposition, Workshops, Art classes, Art Competitions",
        subtitle: "Brushstrokes of Emotion, Canvas of Creativity. Your art exhibition, where stories come to life through vibrant hues. Share your captivating Art event, and let imagination paint the narrative."
    },
    {
        label: "Cooking",
        icon: GiCookingPot,
        description: "Cooking event, Workshops, Cooking classes, Cooking Competitions",
        subtitle: "Savor the Moments, Feast on Culinary Delights. Your culinary escapade, a gastronomic journey through flavors. Share your delectable Cooking event, and let the aroma tell a tale."
    },
    {
        label: "Tech",
        icon: GrTechnology,
        description: "Tech event, Salon, Workshops, Tech classes, Tech Competitions",
        subtitle: "Innovation Unleashed, Future Explored. Your tech summit, a playground of possibilities and groundbreaking ideas. Share your visionary Tech event, and let innovation script the future."
    },
    {
        label: 'Gaming',
        icon: SiYoutubegaming,
        description: "Gaming event, Workshops, Gaming classes, Gaming Competitions",
        subtitle: "Game On, Stories Unfold. Your gaming extravaganza, where virtual worlds become unforgettable memories. Share your thrilling Gaming event, and let the games begin."
    },
    {
        label: "Wellness",
        icon: GrYoga,
        description: "Wellness event, Meditation, Workshops, Wellness classes",
        subtitle: "Nourish the Soul, Energize the Spirit. Your wellness retreat, a holistic journey to inner peace and rejuvenation. Share your revitalizing Wellness event, and let well-being be the story."
    },
    {
        label: "Language",
        icon: FaLanguage,
        description: "Language event, Workshops, Language classes, Language Competitions",
        subtitle: "Linguistic Symphony, Voices United. Your language fest, where words weave tales and cultures converge. Share your diverse Language event, and let the language of connection unfold."
    },
    {
        label: "Photography",
        icon: FaCameraRetro,
        description: "Photography event,Exposition , Workshops, Photography classes, Photography Competitions",
        subtitle: "Capture the Unseen, Freeze the Moment. Your photography exhibition, a gallery of emotions frozen in time. Share your visually stunning Photography event, and let the snapshots narrate stories."
    },
    {
        label: "Networking",
        icon: TiBusinessCard,
        description: "Networking event, Salon,Workshops, Networking classes, Networking Competitions",
        subtitle: "Connections Beyond Business, Stories Beyond Suits. Your networking symposium, where professionals become protagonists in a shared narrative. Share your impactful Networking event, and let connections write success stories."
    },
    {
        label: "Educational",
        icon: MdCastForEducation,
        description: "Educational event, Workshops, Educational classes, Educational Competitions",
        subtitle: "Knowledge Unveiled, Horizons Expanded. Your educational expo, where curiosity leads to endless possibilities. Share your enlightening Educational event, and let learning be the journey."
    },
    {
        label: "Entertainment",
        icon: RiSlideshow2Fill,
        description: "Entertainment event, Workshops, Entertainment classes, Entertainment Competitions",
        subtitle: "Lights, Camera, Unforgettable Moments. Your entertainment event, a stage where joy takes center spotlight. Share your enchanting Entertainment event, and let the show of memories begin."
    },
    {
        label: "Gardening",
        icon: MdNaturePeople,
        description: "Gardening event, Workshops, Gardening classes, Gardening Competitions",
        subtitle: "Cultivate Your Paradise, Bloom with Nature. Your gardening event, where every seed planted tells a story of growth and beauty. Share your green-thumb gathering, and let the garden of memories blossom."
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
                        justify-center
                        overflow-x-scroll
                        whitespace-nowrap
                        scrollbar-hide
                        md:scrollbar-hide
                        relative
                        gap-4
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
