import ClientOnly from "@/app/components/ClientOnly";
import TermsClient from "@/app/terms/TermsClient";

export const revalidate = 0

const termsPage =  () => {

    return (
        <div
            className="relative bg-blueGray-200 pb-6 border-t-1 pt-[200px]">
                <ClientOnly>
                    <TermsClient />
                </ClientOnly>
        </div>
    )
};

export default termsPage;
