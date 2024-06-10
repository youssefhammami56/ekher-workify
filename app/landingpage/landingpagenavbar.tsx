import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";

import { auth } from "@/auth";
import SignInBtn from "./sign-inbtn";
import { getuserrole } from "@/actions/getuserrole";
import WorkifyLogo from "./FiverrLogo";

const LandingPageNavbar = async () => {
  const user = await auth();
  const userId = user?.user.id;

  const role = await getuserrole(userId!);

  return (
    <header className=" top-0 flex h-20 items-center gap-4 border-b bg-background px-4 md:px-6">
      <nav className="hidden  gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6  lg:w-[1750px]">
        <WorkifyLogo />
        <div className="border-r-2 border-muted h-16"></div>

        {/* <Link
          href="#"
          className="flex items-center gap-2 text-lg font-semibold md:text-base"
        >
          <Package2 className="h-6 w-6" />
          <span className="sr-only">Acme Inc</span>
        </Link>
        <Link
          href="/seller/dashboard"
          className="text-foreground transition-colors hover:text-foreground"
        >
          Home
        </Link>

        <Button
          variant={"link"}
          size={"sm"}
          className="text-muted-foreground transition-colors hover:text-foreground"
          asChild
        >
          <Link href="/seller/gigs/create">Create Gigs</Link>
        </Button>
        <Button
          variant={"link"}
          size={"sm"}
          className="text-muted-foreground transition-colors hover:text-foreground"
          asChild
        >
          <Link href="/seller/gigs">My gigs</Link>
        </Button>
        <Button
          variant={"link"}
          size={"sm"}
          className="text-muted-foreground transition-colors hover:text-foreground"
          asChild
        >
          <Link href="/seller/postuled-jobs">Postuled Jobs</Link>
        </Button>

        <Button
          variant={"link"}
          size={"sm"}
          className="text-muted-foreground transition-colors hover:text-foreground"
          asChild
        >
          <Link href="/seller/job-offer">Jobs Offers</Link>
        </Button>

        <Button
          variant={"link"}
          size={"sm"}
          className="text-muted-foreground transition-colors hover:text-foreground"
          asChild
        >
          {firstComunity && (
            <Link href={`/seller/community/${firstComunity.id}`}>
              Community
            </Link>
          )}
        </Button> */}
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
      </Sheet>
      <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <form className="ml-auto flex-1 sm:flex-initial">
          <div className="relative">
            {/* <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search products..."
              className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
            /> */}
          </div>
        </form>
        <SignInBtn role={role} />
      </div>
    </header>
  );
};

export default LandingPageNavbar;
