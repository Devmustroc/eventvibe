import ClientOnly from "@/app/components/ClientOnly";
import FaqClient from "@/app/faq/FaqClient";

const AboutPage =  () => {

    return (
        <div
            className="relative bg-blueGray-200 pb-6 border-t-1 pt-[200px]">
        <ClientOnly>
            <FaqClient />
        </ClientOnly>
        </div>
    )
};

export default AboutPage;
