import BackgroundImageSection from "@/components/ui/background-image-section";
import { Button, LinkButton } from "@/components/ui/button";

export default function Showcase() {
    return (
        <BackgroundImageSection image="/images/showcase_background.png" className="max-h-96">
            <div>
                <h3 className="text-2xl tracking-tight font-semibold">
                    Want to showcase your cutting-edge<br />hardware?
                </h3>
                <p className="max-w-[50ch] py-6">
                    If you're a manufacturer with innovative Single Board Computers, IoT devices, or embedded systems, we invite you to collaborate with us. Our comprehensive, unbiased reviews help tech professionals and makers understand the true potential of your products.
                </p>
                <LinkButton text="Contact Us" link="/contact" />
            </div>
        </BackgroundImageSection>
    )
}