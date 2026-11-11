"use client"
import { usePathname } from 'next/navigation'

/**
 * Wrapper for the main content of the page
 * This was needed as to display the aside bar responsively
 * at the side of the main content.
 */

import reviews from "@/public/data/reviews.json";
import articles from "@/public/data/articles.json";
import { Github, Globe } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function Content({ children }: { children: React.ReactNode }) {
  return <div className="md:flex">{children}</div>;
}

export function MainContent({ children }: { children: React.ReactNode }) {
  return <div className="mb-12 md:mb-0">{children}</div>;
}

export function Tldr({ children }: { children?: React.ReactNode }) {
  return (
    <div className="flex flex-col justify-between gap-6">
      {children && <div className="h-min md:max-w-md md:ml-6 px-6 pb-6 bg-surface">{children}</div>}
      <AsideContent />
    </div>
  );
}

export function AsideContent({ children }: { children?: React.ReactNode }) {
  const currentUrl = usePathname().slice(1);
  
  const latestArticles = articles.filter((article) => article.url != currentUrl).slice(0, 2);
  const latestReviews = reviews.slice(0, 2);


  return (
    <div className="h-min mt-auto md:max-w-md p-6 pt-12 md:ml-6 mb-6 bg-surface space-y-8">
      {children}
      <div>
        <h3 className="text-lg font-semibold">Read More</h3>
        <hr className="border-t-2 border-brand_orange/50 mt-1 mb-2" />
        {latestArticles.map((article) => {
          return (
            <Link
              href={"/" + article.url}
              key={article.url}
              className="py-4 group inline-block"
            >
              <Image
                height={800}
                width={600}
                src={article.thumbnail}
                alt={article.title}
                className="w-full h-20 object-cover"
              />
              <div>
                <h3 className="font-semibold mt-1 group-hover:text-brand_orange transition-colors duration-300">
                  {article.title}
                </h3>
                <hr className="border-t-2 border-brand_orange/50 w-1/6 my-1" />
                <p className="text-sm mt-1">{article.description}</p>
              </div>
            </Link>
          );
        })}
      </div>

      <div>
        <h3 className="text-lg font-semibold">Latest Reviews</h3>
        <hr className="border-t-2 border-brand_orange/50 mt-1 mb-2" />
        {latestReviews.map((review) => {
          return (
            <Link
              href={"/" + review.url}
              key={review.url}
              className="py-4 group inline-block"
            >
              <Image
                height={800}
                width={600}
                src={review.thumbnail}
                alt={review.title}
                className="w-full h-20 object-cover"
              />
              <div>
                <h3 className="font-semibold mt-1 group-hover:text-brand_orange transition-colors duration-300">
                  {review.title}
                </h3>
                <hr className="border-t-2 border-brand_orange/50 w-1/6 my-1" />
                <p className="text-sm mt-1">{review.description}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

type currentAuthor = "tushgaurav" | "undefined";
export function AuthorCard({ authorSlug }: { authorSlug: currentAuthor }) {
  const authorData = {
    tushgaurav: {
      name: "Tushar Gaurav",
      bio: "I am a software developer and a tech enthusiast. I like to write about technology and software development. I write mostly about web development, tech trends, and software development practices.",
      avatar: "/images/authors/tushgaurav.png",
      website: "https://tushgaurav.in",
      twitter: "https://twitter.com/tushgaurav",
      github: "https://github.com/tushgaurav",
    },
    undefined: {
      name: "Unknown",
      bio: "I am a software developer and a tech enthusiast. I like to write about technology and software development.",
      avatar: "/images/authors/unknown.jpg",
      website: "https://tushgaurav.in",
      twitter: "https://twitter.com/tushgaurav",
      github: "",
    },
  };

  const author = authorData[authorSlug];

  return (
    <div className="mt-10">
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <Image
          src={author.avatar}
          height={100}
          width={100}
          className="object-cover rounded-full mr-auto sm:mr-0"
          alt={author.name}
        />
        <div>
          <h3 className="text-lg font-semibold">About {author.name}</h3>
          <p className="text-sm max-w-md">{author.bio}</p>
          <div className="flex gap-2 mt-2">
            <Link href={author.website} target="_blank" className="text-sm">
              <Globe className="w-4 h-4" />
            </Link>
            <Link href={author.github} target="_blank" className="text-sm">
              <Github className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
