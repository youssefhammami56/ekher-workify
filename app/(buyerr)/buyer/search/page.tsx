import { getGigsByFilter } from "@/actions/get-gigs-byfilter";
import React from "react";
import Singlesearchpage from "./_components/singlesearchpage";

interface searchGigsProps {
  q?: string;
  category?: string;
}

interface SearchPageProps {
  searchParams: searchGigsProps;
}

const Page = async ({ searchParams }: SearchPageProps) => {
  const gigs = await getGigsByFilter(searchParams);
  return (
    <div>
      <Singlesearchpage
        gigs={gigs}
        q={searchParams.q}
        category={searchParams.category}
      />
    </div>
  );
};

export default Page;
