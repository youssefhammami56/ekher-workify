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
import { getFirstCommunity } from "@/actions/getfirstcommunity";
import WorkifyLogo from "@/app/landingpage/FiverrLogo";
import Profile2 from "@/app/landingpage/profile2";
import LogoutBtn from "@/app/landingpage/logoutbtn";

const AdminNavbar = async () => {
  const user = await auth();
  const userId = user?.user.id;
  const firstComunity = await getFirstCommunity();

  return (
    <header className=" top-0 flex h-20 items-center gap-4 border-b bg-background px-4 md:px-6">
      <nav className="hidden  gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6  lg:w-[1750px]">
        <WorkifyLogo />
        <div className="border-r-2 border-muted h-16"></div>


        <Link
          href="/admin/frelencers"
          className="text-foreground transition-colors hover:text-foreground"
        >
          Freelancers
        </Link>
        <Link
          href="/admin/client"
          className="text-foreground transition-colors hover:text-foreground"
        >
          clients
        </Link>
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
              <CircleUser className="h-5 w-5" />
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuSeparator />

            <DropdownMenuSeparator />
            <DropdownMenuSeparator />
            <LogoutBtn />
          </DropdownMenuContent>
        </DropdownMenu>
        {/* <SheetNotification /> */}
      </div>
    </header>
  );
};

export default AdminNavbar;
