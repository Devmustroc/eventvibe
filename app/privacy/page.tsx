import ClientOnly from "@/app/components/ClientOnly";
import PrivacyClient from "@/app/privacy/PrivacyClient";

const PrivacyPage =  () => {

    return (
        <div
            className="relative bg-blueGray-200 pb-6 border-t-1 pt-[200px]">
                <ClientOnly>
                    <PrivacyClient />
                </ClientOnly>
        </div>
    )
};

export default PrivacyPage;
