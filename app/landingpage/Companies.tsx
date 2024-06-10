import Image from "next/image";
import React from "react";

function Companies() {
  return (
    <div className="flex items-center justify-center text-gary-400 text-2xl font-bold min-h-[11vh] ">
      Trusted By:
      <ul className="flex justify-center gap-10 ml-10">
        {[1, 2, 3, 4, 5].map((company) => (
          <li key={company} className="relative w-[100px] h-[50px]">
            <Image
              src={`/trusted${company}.png`}
              alt={`trusted${company}`}
              layout="fill"
              objectFit="contain"
              className="cursor-pointer"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Companies;
