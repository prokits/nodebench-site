import Image from "next/image";
import { format } from "date-fns";

export default function Topbar({
  thumbnail,
  thumbnailCaption,
  title,
  date,
}: {
  thumbnail: string;
  thumbnailCaption?: string;
  title: string;
  date: string;
}) {
  return (
    <div className="my-10">
       <h1 className="font-bold mt-20 text-3xl tracking-tight text-gray-900 dark:text-foreground hover:text-brand_orange transition-colors duration-300">
          {title}
        </h1>
      <hr className="mt-2 rounded-full w-full bg-brand_orange-light h-2" />
      <div className="text-sm mt-1 flex items-baseline gap-1">
        <h5 className="mt-1 text-gray-600 dark:text-muted-foreground font-medium">
          {format(new Date(date), "MMMM d, yyyy")}
        </h5>
      </div>

      <Image
        src={thumbnail}
        alt={title}
        width={1200}
        height={400}
        className="my-6 rounded"
      />
      {thumbnailCaption && (
        <p
          className="
                text-xs text-gray-500 dark:text-muted-foreground mt-1
                flex items-center gap-1 
            "
        >
          {thumbnailCaption}
        </p>
      )}
    </div>
  );
}
