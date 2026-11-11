import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";

type AtAGlanceData = {
    launchDate: string;
    launchPrice: string;
    priceInIndia?: string;
    processor?: string;
    gpu?: string;
    ram?: string;
    support?: "life" | "eol";
    popularityScore?: number;
}

type ImageData = {
    src: string | StaticImport;
    description?: string;
    alt: string;
}

type GlanceProps = {
    productData: AtAGlanceData,
    description: string,
    images: ImageData[],
    style?: React.CSSProperties
    className?: string
}

function getTileHeading(key: string) {
    const noMatch = (key: string) => {
        const words = key.split(/(?=[A-Z])/).map(word =>
            word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        );
        return words.join(" ");
    }

    switch (key) {
        case "launchDate":
            return "Launch Date";
        case "launchPrice":
            return "Launch Price";
        case "priceInIndia":
            return "Price in India";
        case "processor":
            return "Processor";
        case "gpu":
            return "GPU";
        case "ram":
            return "RAM";
        case "support":
            return "Support";
        case "popularityScore":
            return "Popularity Score";
        default:
            return noMatch(key);
    }
}

export default function Glance({
    productData,
    description,
    images,
}: GlanceProps
) {
    const entries = Object.entries(productData);
    // With an odd count, fill the last row so the gap takes the checkerboard
    // colour instead of showing the panel behind it.
    const tiles = entries.length % 2 ? [...entries, null] : entries;

    return (
        <div className="grid md:grid-cols-2 gap-4 max-w-6xl mx-auto mb-8">
            <div className="relative aspect-video w-full">
                <Image
                    src={images[0].src}
                    alt={images[0].alt}
                    className="w-full h-full object-cover"
                />
            </div>

            <div className="bg-brand_orange-light/30 h-fit">
                <div className="bg-brand_orange text-white font-semibold py-2 px-4">
                    At a Glance
                </div>
                <div>
                    <p className="p-4 text-sm md:text-base">
                        {description}
                    </p>
                </div>
                <div className="grid grid-cols-2">
                    {tiles.map((tile, index) => {
                        // Checkerboard across the 2-column grid, so no tile shares
                        // a colour with its neighbour across or below it.
                        const row = Math.floor(index / 2);
                        const col = index % 2;
                        const tone = (row + col) % 2 === 0 ? "bg-surface-subtle" : "bg-brand_orange-light/40";

                        if (!tile) return <div key="filler" aria-hidden className={tone} />;

                        const [key, value] = tile;
                        return (
                            <div className={`text-xs md:text-sm py-2 px-4 text-center ${tone}`} key={key}>
                                <span className="block font-bold mb-1">{getTileHeading(key)}</span>
                                <span>{value}</span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    )
}