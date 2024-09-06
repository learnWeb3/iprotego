import { Logo } from "@/icons/Logo";
import { useOidc } from "@axa-fr/react-oidc";
import Link from "next/link";

export function Navbar() {
  const { logout } = useOidc();
  return (
    <nav className="pb-8 bg-[]">
      <div className="flex flex-wrap items-center justify-between">
        <Link
          href="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <Logo />
        </Link>
        <button
          className="px-4 py-2 text-white bg-red-400 rounded hover:bg-red-500"
          onClick={() => logout("/")}
        >
          Déconnexion
        </button>
      </div>
    </nav>
  );
}
