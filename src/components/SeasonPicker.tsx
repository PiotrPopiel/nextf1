"use client";
import { redirect, useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";

const now = new Date().getFullYear();
const seasons: String[] = [];

for (let i = now; i > now - 5; i--) {
  seasons.push(String(i));
}

export default function SeasonPicker() {
  const params = useParams();
  const activeSeason = params.year || seasons[0];
  const [isOpen, setIsOpen] = useState(false);
  const [season, setSeason] = useState(activeSeason);
  const divEl = useRef<HTMLDivElement>(null);

  const handleOption = (e: any) => {
    setSeason(e.target.innerHTML);
    redirect(`/${e.target.innerHTML}`);
  };

  const handleClick = () => {
    setIsOpen((currentIsOpen) => !currentIsOpen);
  };

  useEffect(() => {
    const handler = (e: any) => {
      if (!divEl.current) {
        return;
      }
      if (!divEl.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handler, true);

    return () => {
      document.removeEventListener("click", handler, true);
    };
  }, []);

  const seasonList = seasons.map((year) => {
    return year !== season ? (
      <p
        key={+year}
        onClick={handleOption}
        className="p-2 w-[100px] hover:bg-slate-700">
        {year}
      </p>
    ) : null;
  });

  return (
    <div ref={divEl} className="flex gap-2 items-center">
      <p className="text-xl p-2">Season: </p>

      <div
        onClick={handleClick}
        className="relative w-[100px] flex flex-col gap-2 bg-slate-800 py-2 px-3 cursor-pointer">
        <div className="flex gap-2 items-center justify-between">
          <p className="font-bold">{season}</p>
          <IoMdArrowDropdown className={`${isOpen && `rotate-180`} text-xl`} />
        </div>
        {isOpen && (
          <li className="absolute left-0 top-10 bg-slate-800 flex flex-col  text-center divide-y-1 divide-slate-700">
            {seasonList}
          </li>
        )}
      </div>
    </div>
  );
}
