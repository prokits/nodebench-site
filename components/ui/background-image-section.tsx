import { cn } from "@/lib/utils"
import { StaticImport } from "next/dist/shared/lib/get-img-props"
import Image from "next/image"

export default function BackgroundImageSection({ image, className, children }:
    { image: string | StaticImport, className?: string, children: React.ReactNode }) {
    return (
        <section className={cn("relative p-6 md:p-0 min-h-60 ", className)}>
            <div className="relative w-full">
                <div className="section-container p-6 flex flex-col justify-center">
                    {children}
                </div>
                <Image
                    src={image}
                    fill
                    alt="background image"
                    className="
                        hidden md:block
                        object-cover
                        object-center
                        absolute inset-0
                        -z-10
                        dark:brightness-[0.3]
                        dark:sepia-[0.25]
                    "
                />
                {/* These photos have a light backdrop baked in. In dark mode they are
                    dimmed, then faded into the page on the text side. */}
                <div
                    aria-hidden
                    className="
                        hidden md:dark:block
                        absolute inset-0
                        -z-10
                        bg-gradient-to-r from-background from-10% via-background/75 to-transparent to-80%
                    "
                />
            </div>
        </section>
    )
}
