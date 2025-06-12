import type { Metadata } from "next";
import { Main, Paragraph, Title } from "@/components/ui/static-pages";

export const metadata: Metadata = {
    title: "Ethics Statement",
    description: "Our commitment to transparency, honesty and ethical benchmarking practices in reviewing single board computers and IoT devices",
};

export default function EthicsStatementPage() {
    return (
        <>
            <Main>
                <Title title="Ethics Statement" />
                <h1 className="font-semibold text-4xl tracking-tight mb-8">No Shortcuts, No Compromises</h1>

                <Paragraph>
                    As a hardware enthusiast and developer, I created NodeBench with a simple mission: deliver honest, rigorous, and transparent technology insights. Every benchmark, every review stems from genuine curiosity and a deep passion for understanding how hardware truly performs.
                </Paragraph>
                <Paragraph>
                    My commitment is straightforward - no bullshit, no hidden agendas. Whether a device is sent by a manufacturer or purchased out of pocket, you&apos;ll get an unfiltered assessment. I don&apos;t care about pleasing companies; I care about serving makers, developers, and tech enthusiasts who need real-world information.
                </Paragraph>
                <Paragraph>
                    My testing methodology is built on reproducibility and practical context. I benchmark not just with synthetic tests, but by simulating actual use cases. Every device gets pushed to its limits, and I document everything - successes, limitations, and unexpected quirks.
                </Paragraph>
                <Paragraph>
                    My testing methodology is built on reproducibility and practical context. I benchmark not just with synthetic tests, but by simulating actual use cases. Every device gets pushed to its limits, and I document everything - successes, limitations, and unexpected quirks.
                </Paragraph>
                <Paragraph>
                    Sponsored content? Not on my watch. If a review is sponsored, it&apos;ll be crystal clear. My reputation as a hardware nerd means more to me than any potential quick buck. This is about building a trusted resource for people who geek out over technology as much as I do.
                </Paragraph>
                <Paragraph>
                    Transparency isn&apos;t just a buzzword here - it&apos;s my fundamental promise.
                </Paragraph>

                <Paragraph className="mt-6">
                    Best, <br />
                    Tushar Gaurav
                </Paragraph>
            </Main>


        </>
    )
}