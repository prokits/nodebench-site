import Image, { StaticImageData } from "next/image";

type FigureProps = {
    src: StaticImageData;
    alt: string;
    caption?: string;
    credit?: string;
    creditUrl?: string;
}

export default function Figure({
    src,
    alt,
    caption,
    credit,
    creditUrl,
}: FigureProps) {
    return (
        <figure className="my-8 max-w-[720px]">
            <Image
                src={src}
                alt={alt}
                placeholder="blur"
                sizes="(min-width: 768px) 720px, 100vw"
                className="w-full h-auto"
            />
            {(caption || credit) && (
                <figcaption className="mt-2 text-xs text-muted-foreground">
                    {caption && <span className="text-gray-700 dark:text-foreground/85">{caption} </span>}
                    {credit && (creditUrl ? (
                        <a href={creditUrl} target="_blank" rel="noopener noreferrer" className="underline">
                            {credit}
                        </a>
                    ) : credit)}
                </figcaption>
            )}
        </figure>
    )
}
