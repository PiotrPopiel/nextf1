import Image from "next/image";
import Link from "next/link";
import SeasonPicker from "./SeasonPicker";

export default function Navbar() {
  return (
    <nav className="relative w-full flex gap-8 items-center bg-slate-900 p-4 shadow-md">
      <Image alt="logo" src={`/Logo.svg`} width={80} height={30} />
      <SeasonPicker />
    </nav>
  );
}
