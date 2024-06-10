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

const ClientNavbar = async () => {
  const user = await auth();
  const userId = user?.user.id;
  const loggeduser = await getLoggedUser();
  const firstComunity = await getFirstCommunity();

  return (
    <header className=" top-0 flex h-20 items-center gap-4 border-b bg-background px-4 md:px-6">
      <nav className="hidden  gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6  lg:w-[1750px]">
        <WorkifyLogo />
        <div className="border-r-2 border-muted h-16"></div>

        <Link
          href="#"
          className="flex items-center gap-2 text-lg font-semibold md:text-base"
        >
          <Package2 className="h-6 w-6" />
          <span className="sr-only">Acme Inc</span>
        </Link>
        <Link
          href="/buyer/search"
          className="text-foreground transition-colors hover:text-foreground"
        >
          Browse Services
        </Link>
        <Link
          href="/buyer/orders"
          className="text-foreground transition-colors hover:text-foreground"
        >
          Applied Services
        </Link>

        <Button
          variant={"link"}
          size={"sm"}
          className="text-muted-foreground transition-colors hover:text-foreground"
          asChild
        >
          <Link href="/buyer/job-offers/create">Create Offer</Link>
        </Button>
        <Button
          variant={"link"}
          size={"sm"}
          className="text-muted-foreground transition-colors hover:text-foreground"
          asChild
        >
          <Link href="/buyer/my-job-offers">My Job Offers</Link>
        </Button>

        <Button
          variant={"link"}
          size={"sm"}
          className="text-muted-foreground transition-colors hover:text-foreground"
          asChild
        >
          {firstComunity && (
            <Link href={`/buyer/community/${firstComunity.id}`}>Communities</Link>
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
              <CircleUser className="h-5 w-5  text-blue-500" />
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuItem>
              <Link href="/buyer/update_profile">Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <LogoutBtn />
          </DropdownMenuContent>
        </DropdownMenu>
        <SheetNotification user={loggeduser!} />
      </div>
    </header>
  );
};

export default ClientNavbar;
