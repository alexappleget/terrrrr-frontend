import { BACKEND_URL } from "@/lib/utils";
import type { IUserWorlds } from "@/types/interface";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";

export const WorldPage = () => {
  const { id } = useParams();
  const [world, setWorld] = useState<IUserWorlds>();
  const { pathname } = useLocation();

  useEffect(() => {
    const fetchWorld = async () => {
      const response = await fetch(`${BACKEND_URL}/api/world/${id}`, {
        method: "GET",
        credentials: "include",
      });

      const { membership } = await response.json();
      setWorld(membership);
    };

    fetchWorld();
  }, [id]);

  const isActiveTab = (tab: string) => pathname.endsWith(`/${tab}`);

  return (
    <section className="flex flex-col min-h-screen">
      <nav className="flex items-center justify-between h-20 border-b-2 px-4 md:px-16 lg:px-32 xl:px-52">
        <Link
          to="/dashboard"
          className="flex items-center gap-2 border-2 border-black p-2"
        >
          <ArrowLeft className="p-1" />
          <span>BACK</span>
        </Link>
        <h2>{world?.world.name}</h2>
      </nav>
      <div className="flex flex-wrap justify-center mt-10 gap-2 px-4 sm:gap-4">
        {["bosses", "notes", "events"]
          .concat(
            world && ["OWNER", "ADMIN", "SUB_ADMIN"].includes(world.role)
              ? ["admin"]
              : []
          )
          .map((tab) => (
            <Link
              key={tab}
              to={tab}
              className={`border-2 py-2 px-6 sm:px-12 text-xs sm:text-sm ${
                isActiveTab(tab) ? "bg-black text-white" : "hover:bg-gray-200"
              }`}
            >
              {tab.toUpperCase()}
            </Link>
          ))}
      </div>

      <Outlet />
    </section>
  );
};
