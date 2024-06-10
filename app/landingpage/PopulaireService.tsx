"use client"
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

function PopularServices() {
  const router = useRouter();
  const popularServicesData = [
    { name: "programming and tech", label: "lifestyle", image: "/service1.png" },
    { name: "lifestyle", label: "Build your brand", image: "/service2.jpeg" },
    {
      name: "Business",
      label: "Customize your site",
      image: "/service3.jpeg",
    },
    {
      name: "AI",
      label: "Share your message",
      image: "/service4.jpeg",
    },
    {
      name: "graphic design",
      label: "Reach more customers",
      image: "/service5.jpeg",
    },
    { name: "Video & Animation", label: "Unlock growth online", image: "/service6.jpeg" },
    {
      name: "Digital Marketing",
      label: "Color your dreams",
      image: "/service7.jpeg",
    },
    { name: "Translation", label: "Go global", image: "/service8.jpeg" },
  ];
  return (
    <div className="mx-20 my-16">
      <h2 className="text-4xl mb-5 text-[#404145] font-bold">
        Popular Services
      </h2>
      <ul className="flex flex-wrap gap-16">
        {/* @ts-ignore */}
        {popularServicesData.map(({ name, label, image }) => {
          return (
            <li
              key={name}
              className="relative cursor-pointer"
              onClick={() => router.push(`/search?q=${name.toLowerCase()}`)}
            >
              <div className="absolute z-10 text-white left-5 top-4">
                <span>{label}</span>
                <h6 className="font-extrabold text-2xl">{name}</h6>
              </div>
              <div className="h-80 w-72 ">
                <Image src={image} fill alt="service" />
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default PopularServices;
