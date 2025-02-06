"use client";

import Image from "next/image";
import Link from "next/link";
import ThemeToggle from "../../app/ThemeProvider";
import { usePrivy } from '@privy-io/react-auth';

const Navbar = () => {
  const { ready, authenticated, login, user, logout } = usePrivy();
  return (
    <header className="flex items-center justify-between px-6 py-4 border-b bg-background  dark:bg-black dark:border-border-dark sticky top-0"> 
      <Link href="/" className="text-xl font-mono text-foreground dark:text-green-300 cursor-pointer hover:opacity-80 transition">
        <Image src="/assets/logo.png" alt="scambuzzer" width={180} height={38} />
      </Link>

      <div className="flex items-center space-x-4">
        {ready && authenticated ? <button className="text-xl font-mono text-foreground dark:text-green-300 cursor-pointer hover:opacity-80 transition" onClick={async () => logout()}>{user?.twitter.name}</button> : <button className="px-4 py-2 text-sm text-foreground dark:text-green-300 border border-transparent rounded-md dark:hover:bg-green-400/10 transition-colors hover:bg-green-400/10" onClick={async () => {
          await login();
          // redirect to dashboard

        }}>
          Create Agent
        </button>}
        <ThemeToggle />
      </div>
    </header>
  );
};

export default Navbar;
