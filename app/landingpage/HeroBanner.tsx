"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function HeroBanner() {
  const router = useRouter();
  const [image, setImage] = useState(1);
  useEffect(() => {
    const interval = setInterval(() => {
      setImage((prev) => (prev === 5 ? 1 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-[500px] relative bg-cover w-full">
      <div className="absolute top-0 right-0 w-[120vw] h-full transition-opacity z-0">
        <Image
          alt="hero-banner"
          src="/site1 (2).png"
          fill
          className={`${
            image === 1 ? "opacity-100" : "opacity-0"
          } transition-all duration-1000`}
        />
        <Image
          alt="hero-banner"
          src="/site1 (1).png"
          fill
          className={`${
            image === 2 ? "opacity-100" : "opacity-0"
          } transition-all duration-1000`}
        />
        <Image
          alt="hero-banner"
          src="/site3.png"
          fill
          className={`${
            image === 3 ? "opacity-100" : "opacity-0"
          } transition-all duration-1000`}
        />
        <Image
          alt="hero-banner"
          src="/site2.png"
          fill
          className={`${
            image === 4 ? "opacity-100" : "opacity-0"
          } transition-all duration-1000`}
        />
                <Image
          alt="hero-banner"
          src="/sitee.png"
          fill
          className={`${
            image === 4 ? "opacity-100" : "opacity-0"
          } transition-all duration-1000`}
        />
                <Image
          alt="hero-banner"
          src="/site2.png"
          fill
          className={`${
            image === 4 ? "opacity-100" : "opacity-0"
          } transition-all duration-1000`}
        />
                <Image
          alt="hero-banner"
          src="/site3.png"
          fill
          className={`${
            image === 3 ? "opacity-100" : "opacity-0"
          } transition-all duration-1000`}
        />
                <Image
          alt="hero-banner"
          src="/site1 (2).png"
          fill
          className={`${
            image === 1 ? "opacity-100" : "opacity-0"
          } transition-all duration-1000`}
        />
                        <Image
          alt="hero-banner"
          src="/site1 (2).png"
          fill
          className={`${
            image === 1 ? "opacity-100" : "opacity-0"
          } transition-all duration-1000`}
        />
                        <Image
          alt="hero-banner"
          src="/site1 (2).png"
          fill
          className={`${
            image === 1 ? "opacity-100" : "opacity-0"
          } transition-all duration-1000`}
        />
                        <Image
          alt="hero-banner"
          src="/site1 (2).png"
          fill
          className={`${
            image === 1 ? "opacity-100" : "opacity-0"
          } transition-all duration-1000`}
        />
      </div>
      <div className="z-1 relative w-[650px] flex justify-center flex-col h-full gap-5 ml-20">
        <h1 className="text-white text-5xl leading-snug">
          Find the perfect &nbsp;<i>freelancer</i> for your project
        </h1>
        <div className="flex align-middle">
          <div className="relative">
            {/* <input
              type="text"
              placeholder="Search for services"
              className="w-[500px] h-14 bg-white rounded-lg px-5"
            /> */}

            {/* <button className="absolute right-0 top-0 h-14 w-20 bg-blue-500 text-white rounded-r-lg">
              Search
            </button> */}
          </div>
        </div>

      </div>
    </div>
  );
}

export default HeroBanner;
