import Image from "next/image";
import Link from "next/link";

const links = ["Season 2025"];

export default function Navbar() {
  const renderedLinks = links.map((link, idx) => (
    <Link className=" font-semibold" key={idx} href="/">
      {link}
    </Link>
  ));

  return (
    <nav className="w-full flex gap-8 items-center bg-slate-900 p-4 shadow-md">
      <Image alt="logo" src={`/Logo.svg`} width={80} height={30} />
      {renderedLinks}
    </nav>
  );
}
