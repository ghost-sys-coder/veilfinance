import React from "react";
import Link from "next/link";
import Image from "next/image";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { Button } from "../ui/button";
import { LayoutDashboard, PenBox } from "lucide-react";
// import { checkUser } from "@/lib/checkUser";

const Header = async () => {
  // await checkUser();
  return (
    <div className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b">
      <nav className="flex justify-between items-center py-4 px-4 container">
        <Link href={"/"}>
          <Image
            src={"/VEILFINANCE.png"}
            alt="veil finance logo"
            width={100}
            height={30}
            className="h-12 w-auto object-contain"
          />
        </Link>
        <div className="flex items-center gap-2 space-x-2">
          <SignedIn>
            <Button asChild className="">
              <Link href={"/dashboard"} className="flex justify-center items-center gap-2 text-gray-600 hover:text-blue-600">
                <LayoutDashboard size={20} />
                <span>Dashboard</span>
              </Link>
            </Button>
          </SignedIn>
          <SignedIn>
            <Button asChild variant={"outline"}>
              <Link href={"/transactions/create"} className="flex justify-center items-center gap-2">
                <PenBox size={18} />
                <span>Add Transaction</span>
              </Link>
            </Button>
          </SignedIn>
          <SignedIn>
            <UserButton appearance={{elements: {avatarBox: "w-20 h-20"}}} />
          </SignedIn>
          <SignedOut>
            <SignInButton forceRedirectUrl="/dashboard">
              <Button variant={"outline"}>Login</Button>
            </SignInButton>
          </SignedOut>
        </div>
      </nav>
    </div>
  );
};

export default Header;
