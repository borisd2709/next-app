"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";

const NavBar = () => {
  const { status, data: session } = useSession();

  return (
    <>
      {/* ✅ TOP NAV (modules menu) */}
      <div className="navbar bg-base-100 shadow-md fixed top-0 left-0 w-full z-50">
        <div className="flex-1">
          <span className="font-bold text-primary">KaakApp</span>
        </div>

        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost">
            Modules ⬇️
          </label>

          <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
            <li>
              <Link href="/module-1">Module 1</Link>
            </li>
            <li>
              <Link href="/module-2">Module 2</Link>
            </li>
            <li>
              <Link href="/module-3">Module 3</Link>
            </li>
            <li>
              <Link href="/module-4">Module 4</Link>
            </li>
          </ul>
        </div>
      </div>

      {/* ✅ BOTTOM NAV */}
      <div className="fixed bottom-0 left-0 w-full bg-base-100 border-t flex justify-around items-center h-16 z-50">
        <Link href="/" className="flex flex-col items-center text-xs">
          <span>🏠</span>
          <span>Home</span>
        </Link>

        <Link href="/aanpak" className="flex flex-col items-center text-xs">
          <span>📋</span>
          <span>Aanpak</span>
        </Link>

        <Link href="/start-1" className="flex flex-col items-center text-xs">
          <span>1️⃣</span>
          <span>Start</span>
        </Link>

        {session && (
          <Link href="/dashboard" className="flex flex-col items-center text-xs">
            <span>📊</span>
            <span>Dashboard</span>
          </Link>
        )}

        {/* ✅ Afspraak */}
        <Link
          href="https://www.borisdrogtfysio.nl/afspraak"
          className="flex flex-col items-center text-xs"
        >
          <span>📅</span>
          <span>Afspraak</span>
        </Link>

        {/* ✅ login / logout */}
        {status === "authenticated" ? (
          <button
            onClick={() => signOut()}
            className="flex flex-col items-center text-xs"
          >
            <span>🚪</span>
            <span>Uit</span>
          </button>
        ) : (
          <button
            onClick={() => signIn("google")}
            className="flex flex-col items-center text-xs"
          >
            <span>👤</span>
            <span>Login</span>
          </button>
        )}
      </div>
    </>
  );
};

export default NavBar;