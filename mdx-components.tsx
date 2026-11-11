import React, { ComponentPropsWithoutRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { highlight } from 'sugar-high';

type HeadingProps = ComponentPropsWithoutRef<'h1'>;
type ParagraphProps = ComponentPropsWithoutRef<'p'>;
type ListProps = ComponentPropsWithoutRef<'ul'>;
type ListItemProps = ComponentPropsWithoutRef<'li'>;
type AnchorProps = ComponentPropsWithoutRef<'a'>;
type BlockquoteProps = ComponentPropsWithoutRef<'blockquote'>;

const components = {
    h1: (props: HeadingProps) => (
        <h1 className="font-bold text-lg mt-6 mb-2" {...props} />
    ),
    h2: (props: HeadingProps) => (
        <h2 className="font-bold text-xl mt-8 mb-4" {...props} />
    ),
    h3: (props: HeadingProps) => (
        <h3 className="font-semibold text-lg mt-6 mb-3" {...props} />
    ),
    h4: (props: HeadingProps) => (
        <h4 className="font-semibold text-base mt-4 mb-2" {...props} />
    ),
    p: (props: ParagraphProps) => (
        <p className="text-gray-700 dark:text-foreground/85 leading-relaxed mb-4 max-w-[92ch]" style={{
            maxWidth: '720px',
        }} {...props}/>
    ),
    ol: (props: ListProps) => (
        <ol className="list-decimal pl-8 mb-4 space-y-2" {...props} />
    ),
    ul: (props: ListProps) => (
        <ul className="list-disc pl-8 mb-4 space-y-2" {...props} />
    ),
    li: (props: ListItemProps) => (
        <li className="text-gray-700 dark:text-foreground/85" {...props} />
    ),
    em: (props: ComponentPropsWithoutRef<'em'>) => (
        <em className="italic" {...props} />
    ),
    strong: (props: ComponentPropsWithoutRef<'strong'>) => (
        <strong className="font-bold" {...props} />
    ),
    a: ({ href, children, ...props }: AnchorProps) => {
        const className = 'text-brand_orange hover:text-brand_orange-light dark:hover:text-foreground underline';
        if (href?.startsWith('/')) {
            return (
                <Link href={href} className={className} {...props}>
                    {children}
                </Link>
            );
        }
        if (href?.startsWith('#')) {
            return (
                <a href={href} className={className} {...props}>
                    {children}
                </a>
            );
        }
        return (
            <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={className}
                {...props}
            >
                {children}
            </a>
        );
    },
    code: ({ children, ...props }: ComponentPropsWithoutRef<'code'>) => {
        const codeHTML = highlight(children as string);
        return (
            <code
                className="bg-surface-subtle px-1.5 py-0.5 rounded text-sm"
                dangerouslySetInnerHTML={{ __html: codeHTML }}
                {...props}
            />
        );
    },
    Table: ({ data }: { data: { headers: string[]; rows: string[][] } }) => (
        <table className="w-full border-collapse mb-4">
            <thead>
                <tr className="bg-surface-subtle">
                    {data.headers.map((header, index) => (
                        <th key={index} className="border p-2 text-left">{header}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.rows.map((row, index) => (
                    <tr key={index} className="border-b">
                        {row.map((cell, cellIndex) => (
                            <td key={cellIndex} className="border p-2">{cell}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    ),
    blockquote: (props: BlockquoteProps) => (
        <blockquote
            className="border-l-4 border-brand_orange pl-4 py-2 my-4 bg-gray-50 dark:bg-surface-subtle italic"
            {...props}
        />
    ),

    img: ({ src, alt, ...props }: ComponentPropsWithoutRef<'img'>) => {
        // A span, not a div: markdown wraps standalone images in <p>.
        return (
            <span className="block my-8">
                <Image
                    src={src as string}
                    alt={alt || ''}
                    className="min-w-40"
                    width={800}
                    height={400}
                />
            </span>
        );
    },
};

declare global {
    type MDXProvidedComponents = typeof components;
}

export function useMDXComponents(): MDXProvidedComponents {
    return components;
}
