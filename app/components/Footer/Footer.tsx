import {FooterClient} from "@/app/components/Footer/FooterClient";
import ClientOnly from "@/app/components/ClientOnly";
import {Container} from "@/app/components/Container";

export const Footer = () => {

    return (
        <Container>
                <ClientOnly>
                        <FooterClient/>
                </ClientOnly>
        </Container>
    );
};
