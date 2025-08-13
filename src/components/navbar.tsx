import { useState } from "react";
import { Link } from "react-router-dom";
import { Sword, Menu, X } from "lucide-react";
import { Button } from "@/components/button/button";
import { CustomLink } from "./link";

export const Navbar = ({ handleSignOut }: { handleSignOut: () => void }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="h-20 px-4 md:px-16 lg:px-32 xl:px-52 flex items-center justify-between text-white bg-gradient-to-b from-[#4caf50] to-[#3e8e41] border-b-4 border-[#2e5a1f]">
      {/* Logo */}
      <Link to="/dashboard" className="flex items-center gap-2">
        <Sword className="h-10 w-10 p-1 rounded-lg bg-[#2e5a1f] text-[#c2ff9e]" />
        <span>Terrrrr</span>
      </Link>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-4">
        <Button
          type="button"
          className="border-2 border-[#2e5a1f] bg-[#2e5a1f] text-[#c2ff9e] hover:bg-[#c2ff9e] hover:border-[#2e5a1f] hover:text-[#1E3A2F]"
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
        <div className="absolute top-20 left-0 w-full flex flex-col items-center gap-4 py-4 shadow-md md:hidden z-50 bg-gradient-to-b from-[#4caf50] to-[#3e8e41] border-b-4 border-[#2e5a1f]">
          <CustomLink
            href="/profile"
            className="w-1/2 bg-[#c2ff9e] text-[#2e5a1f] border-2 border-[#2e5a1f] hover:bg-[#2e5a1f] hover:text-[#c2ff9e]"
          >
            Profile
          </CustomLink>
          <CustomLink
            href="/settings"
            className="w-1/2 bg-[#c2ff9e] text-[#2e5a1f] border-2 border-[#2e5a1f] hover:bg-[#2e5a1f] hover:text-[#c2ff9e]"
          >
            Settings
          </CustomLink>
          <Button
            type="button"
            className="border-2 w-1/2 border-[#2e5a1f] bg-[#2e5a1f] text-[#c2ff9e] hover:bg-[#c2ff9e] hover:border-[#2e5a1f] hover:text-[#1E3A2F] hover:cursor-pointer"
            onClick={handleSignOut}
          >
            Sign Out
          </Button>
        </div>
      )}
    </nav>
  );
};
