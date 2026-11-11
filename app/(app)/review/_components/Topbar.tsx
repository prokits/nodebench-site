import Image from "next/image"

export default function Topbar({
    brandName,
    brandLogo,
    title,
    author,
    date
}: {
    brandName: string,
    brandLogo: string,
    title: string,
    author: string,
    date: string
}) {
    return (
        <div className="mb-4">
            <div className="flex items-center gap-2 py-2">
                {brandLogo && <Image 
                src={brandLogo} 
                alt={brandName} 
                width="100" 
                height="10"
                className="
                object-contain
                object-left
                max-h-6
                w-min
                dark:brightness-0
                dark:invert
                "
                 />}
                {!brandLogo && brandName && <span>{brandName}</span>}
                <hr className=" w-full bg-brand_orange-light/20 h-2" />
            </div>
            <h1 className="font-bold text-2xl track">{title}</h1>
            <div className="text-sm mt-2 flex items-baseline gap-1">
                <h5><span className="font-bold">By </span>{author} on</h5>
                <h5 className="font-bold">{date}</h5>
            </div>
            <hr className="h-[1px] mt-4 bg-brand_orange-light" />
        </div>
    )
}