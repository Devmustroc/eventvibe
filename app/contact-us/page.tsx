import ClientOnly from "@/app/components/ClientOnly";
import ContactClient from "@/app/contact-us/ContactClient";

const ContactPage =  () => {

    return (
        <div
            className="relative bg-blueGray-200 pb-6 border-t-1 pt-[200px]">
            <ClientOnly>
                <ContactClient />
            </ClientOnly>
        </div>
    )
};

export default ContactPage;
