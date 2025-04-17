import Image from "next/image";
import Link from "next/link";

function Navlink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <li>
      <Link
        href={href}
        className="
          hover:text-orange-50
            transition-colors
            duration-300
            "
      >
        {children}
      </Link>
    </li>
  );
}

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-brand_orange border-b-4 border-red-300">
      <div className="container max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/">
          <Image src="/images/logo.png" alt="nodebench" width={170} height={20} />
        </Link>
        <ul className="flex gap-6 text-sm">
          <Navlink href="/review">Reviews</Navlink>
          <Navlink href="/articles">Articles</Navlink>
        </ul>
      </div>
    </nav>
  );
}
