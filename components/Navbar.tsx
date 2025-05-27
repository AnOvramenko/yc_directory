import { auth, signOut, signIn } from "@/auth";
import { BadgePlusIcon, LogOutIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const Navbar = async () => {
  const session = await auth();

  return (
    <header className="px-5 py-3 bg-white shadow-sm font-work-sans">
      <nav className="flex justify-between items-center">
        <Link href="/">
          <Image alt="logo" src="/logo.png" width={144} height={30} />
        </Link>

        <div className="flex items-center gap-5 text-black">
          {session && session?.user ? (
            <>
              <Link href={"/startup/create"}>
                <span className="max-sm:hidden">Create</span>
                <BadgePlusIcon className="size-6 sm:hidden text-green-500"/>
              </Link>

              <form
                action={async () => {
                  "use server";

                  await signOut({ redirectTo: "/" });
                }}
              >
                <button type="submit">
                  <span className="max-sm:hidden">Log out</span>
                  <LogOutIcon className="size-6 sm:hidden text-red-500 mt-[6px]"/>
                </button>
              </form>

              <Link href={`/user/${session?.id}`}>
                {/* <span className="max-sm:hidden">{session?.user?.name}</span> */}
                <Avatar className="size-10">
                  <AvatarImage src={session?.user?.image} alt={session?.user?.name || 'user avatar'}/>
                  <AvatarFallback>AV</AvatarFallback>
                </Avatar>
              </Link>
            </>
          ) : (
            <form
              action={async () => {
                "use server";

                await signIn("github");
              }}
            >
              <button type="submit">Login</button>
            </form>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
