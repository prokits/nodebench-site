"use client"

import Link from "next/link";
import Image from "next/image";
import { format, formatDistanceToNow } from "date-fns";

export default function BlogCard({
  title,
  image,
  description,
  date,
  url,
}: {
  title: string;
  image: string;
  description: string;
  date: string;
  url: string;
}) {
  return (
    <Link href={url} className="bg-gray-300 group overflow-hidden rounded-lg ">
      <Image src={image} height={200} width={1000} alt={title}  />
      <hr className="border-brand_orange/60 border-b-4"/>
      <div className="px-4 pt-2 pb-4">
        <h3 className="font-semibold text-lg group-hover:text-orange-700 transition-colors">{title}</h3>
        <p className="text-sm text-gray-600 mb-4">
          {format(new Date(date), 'dd MMMM yyyy')} • {formatDistanceToNow(new Date(date)) + " ago"}
        </p>
        <p className="leading-5 text-gray-800 mb-2">{description}</p>
        {/* <Link href={url} className="bg-brand_orange/20 py-2 px-4 inline-flex items-center justify-between gap-2 text-black text-sm">
            Read <MoveUpRight className="w-4 h-4" />
        </Link> */}
      </div>
    </Link>
  );
}