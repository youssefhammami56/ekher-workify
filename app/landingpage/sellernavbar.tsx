import Link from "next/link";
import { CircleUser, Menu, Package2, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import { auth } from "@/auth";
import SheetNotification from "./notification-sheet";
import { getFirstCommunity } from "@/actions/getfirstcommunity";
import LogoutBtn from "./logoutbtn";
import Profile2 from "./profile2";
import WorkifyLogo from "./FiverrLogo";
import { getLoggedUser } from "@/actions/get-logged-user";

const SellerNavbar = async () => {
  const user = await auth();
  const userId = user?.user.id;
  const loggeduser = await getLoggedUser();
  const firstComunity = await getFirstCommunity();

  return (
    <header className=" top-0 flex h-20 items-center gap-4 border-b bg-background px-4 md:px-6">
      <nav className="hidden  gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6  lg:w-[2850px] ">
        {/* <Logo /> */}
        <WorkifyLogo />
        <div className="border-r-2 border-muted h-16"></div>

        <Link
          href="/seller/dashboard"
          className="text-foreground transition-colors hover:text-foreground"
        >
          Dashboard
        </Link>

        <Button
          variant={"link"}
          size={"sm"}
          className="text-muted-foreground transition-colors hover:text-foreground"
          asChild
        >
          <Link href="/seller/gigs/create">Create a Service</Link>
        </Button>
        <Button
          variant={"link"}
          size={"sm"}
          className="text-muted-foreground transition-colors hover:text-foreground"
          asChild
        >
          <Link href="/seller/gigs">My Services</Link>
        </Button>
        <Button
          variant={"link"}
          size={"sm"}
          className="text-muted-foreground transition-colors hover:text-foreground"
          asChild
        >
          <Link href="/seller/orders">My Services orders</Link>
        </Button>
        <Button
          variant={"link"}
          size={"sm"}
          className="text-muted-foreground transition-colors hover:text-foreground"
          asChild
        >
          <Link href="/seller/postuled-jobs">Applied jobs</Link>
        </Button>

        <Button
          variant={"link"}
          size={"sm"}
          className="text-muted-foreground transition-colors hover:text-foreground"
          asChild
        >
          <Link href="/seller/job-offer">Job Offers</Link>
        </Button>

        <Button
          variant={"link"}
          size={"sm"}
          className="text-muted-foreground transition-colors hover:text-foreground"
          asChild
        >
          {firstComunity && (
            <Link href={`/seller/community/${firstComunity.id}`}>
              Communities
            </Link>
          )}
        </Button>
      </nav>

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
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon" className="rounded-full">
              <CircleUser className="h-5 w-5 text-blue-500" />
              <span className="sr-only ">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-white">
            <DropdownMenuLabel>Account</DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuSeparator />
            <DropdownMenuItem>
              {" "}
              <Link href="/seller/update_profile">Profile</Link>
            </DropdownMenuItem>

            <DropdownMenuSeparator />
            <LogoutBtn />
          </DropdownMenuContent>
        </DropdownMenu>
        <SheetNotification user={loggeduser} />
      </div>
    </header>
  );
};

export default SellerNavbar;
