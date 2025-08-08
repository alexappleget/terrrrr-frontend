import { useState } from "react";
import { Link } from "react-router-dom";
import { Sword, Menu, X } from "lucide-react";
import { Button } from "@/components/button/button";
import { CustomLink } from "./link";

export const Navbar = ({ handleSignOut }: { handleSignOut: () => void }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="border-b-2 border-[#7A5230] bg-[#1E3A2F] h-20 px-4 md:px-16 lg:px-32 xl:px-52 flex items-center justify-between text-[#D9E6B9]">
      {/* Logo */}
      <Link to="/dashboard" className="flex items-center gap-2">
        <Sword className="h-10 w-10 p-1 rounded-lg bg-[#7A5230] text-[#D9E6B9]" />
        <span className="text-lg font-semibold">Terrrrr</span>
      </Link>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-4 text-sm">
        <CustomLink
          href="/profile"
          className="bg-transparent text-[#D9E6B9] border-2 border-[#7A5230] hover:bg-[#3FA34D] hover:text-[#1E3A2F]"
        >
          Profile
        </CustomLink>
        <CustomLink
          href="/settings"
          className="bg-transparent text-[#D9E6B9] border-2 border-[#7A5230] hover:bg-[#3FA34D] hover:text-[#1E3A2F]"
        >
          Settings
        </CustomLink>
        <Button
          type="button"
          className="border-2 border-[#7A5230] bg-[#7A5230] text-[#D9E6B9] hover:bg-[#3FA34D] hover:border-[#3FA34D] hover:text-[#1E3A2F] hover:cursor-pointer"
          onClick={handleSignOut}
        >
          Sign Out
        </Button>
      </div>

      {/* Mobile Toggle Button */}
      <button
        className="md:hidden text-[#D9E6B9] hover:text-[#A8D18D]"
        onClick={() => setIsMobileMenuOpen((prev) => !prev)}
      >
        {isMobileMenuOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <Menu className="w-6 h-6" />
        )}
      </button>

      {/* Mobile Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-20 left-0 w-full bg-[#1E3A2F] border-b-2 border-[#7A5230] flex flex-col items-center gap-4 py-4 shadow-md md:hidden z-50 text-[#D9E6B9]">
          <CustomLink
            href="/profile"
            className="w-1/2 bg-transparent text-[#D9E6B9] border-2 border-[#7A5230] hover:bg-[#3FA34D] hover:text-[#1E3A2F]"
          >
            Profile
          </CustomLink>
          <CustomLink
            href="/settings"
            className="w-1/2 bg-transparent text-[#D9E6B9] border-2 border-[#7A5230] hover:bg-[#3FA34D] hover:text-[#1E3A2F]"
          >
            Settings
          </CustomLink>
          <Button
            type="button"
            className="border-2 w-1/2 border-[#7A5230] bg-[#7A5230] text-[#D9E6B9] hover:bg-[#3FA34D] hover:border-[#3FA34D] hover:text-[#1E3A2F] hover:cursor-pointer"
            onClick={handleSignOut}
          >
            Sign Out
          </Button>
        </div>
      )}
    </nav>
  );
};
