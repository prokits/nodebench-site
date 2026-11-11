/**
 * nodebench Search
 * v0.1.1 - Using data from public route, data generated at build time.
 */

"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import Link from "next/link"
import reviews from "@/public/data/reviews.json"
import articles from "@/public/data/articles.json"
import type { ReviewMetadata, ArticleMetadata } from "@/lib/types"


function searchFromMetadata(searchString: string, reviews: ReviewMetadata[], articles: ArticleMetadata[]) {
    const searchResults = [...reviews, ...articles].filter((item) => {
        return item.title.toLowerCase().includes(searchString.toLowerCase())
    })

    return searchResults

}

export default function SearchBar() {
    const [searchString, setSearchString] = useState<string>("")

    return (
        <div className="flex flex-col items-center w-full">
            <div className="relative w-full max-w-2xl">
                <div className="flex items-center bg-card rounded-full shadow-xl hover:shadow-2xl transition-shadow dark:ring-1 dark:ring-border">
                    <Search className="absolute left-6 w-5 h-5 text-gray-400" />
                    <Input 
                        type="text" 
                        placeholder="Search benchmarks, reviews, and articles..." 
                        className="w-full pl-16 pr-4 py-4 text-lg border-none rounded-l-full focus:ring-0 focus:outline-none focus-visible:ring-0" 
                        value={searchString} 
                        onChange={(e) => setSearchString(e.target.value)} 
                    />
                    <button className="px-8 py-4 bg-brand_orange hover:bg-opacity-90 transition-colors rounded-r-full">
                        <span className="text-white font-medium">Search</span>
                    </button>
                </div>
                
                {searchString.length > 0 && (
                    <div className="absolute z-10 w-full mt-2 bg-card rounded-2xl shadow-2xl border border-gray-100 dark:border-border">
                        {searchFromMetadata(searchString, reviews, articles).map((result) => (
                            <Link href={result.url} key={result.url}>
                                <div className="p-4 hover:bg-gray-50 dark:hover:bg-surface text-left transition-colors first:rounded-t-2xl last:rounded-b-2xl">
                                    <h3 className="text-base font-medium text-gray-900 dark:text-foreground">{result.title}</h3>
                                    <p className="mt-1 text-sm text-gray-500 dark:text-muted-foreground">{result.description}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}