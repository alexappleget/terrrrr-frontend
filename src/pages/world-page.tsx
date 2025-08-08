import { getWorldMembership } from "@/functions/functions";
import type { IUserWorlds } from "@/types/interface";
import { ArrowLeft, Calendar, Notebook, Settings, Skull } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";

export const WorldPage = () => {
  const { id } = useParams();
  const [world, setWorld] = useState<IUserWorlds>();
  const { pathname } = useLocation();

  const fetchWorld = useCallback(async () => {
    if (!id) {
      throw new Error("World ID not found.");
    }

    const response = await getWorldMembership({ id });

    const { membership } = await response.json();
    setWorld(membership);
  }, [id]);

  useEffect(() => {
    fetchWorld();
  }, [fetchWorld]);

  const isActiveTab = (tab: string) => pathname.endsWith(`/${tab}`);

  const tabs = [
    { key: "bosses", label: "Bosses", icon: Skull, visible: true },
    { key: "notes", label: "Notes", icon: Notebook, visible: true },
    { key: "events", label: "Events", icon: Calendar, visible: true },
    {
      key: "admin",
      label: "Admin",
      icon: Settings,
      visible: world && ["OWNER", "ADMIN", "SUB_ADMIN"].includes(world.role),
    },
  ];

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
        {tabs
          .filter((tab) => tab.visible)
          .map(({ key, label, icon: Icon }) => (
            <Link
              key={key}
              to={key}
              className={`border-2 py-2 px-6 sm:px-12 text-xs sm:text-sm flex items-center gap-2 ${
                isActiveTab(key) ? "bg-black text-white" : "hover:bg-[#FAF9F6]"
              }`}
              aria-current={isActiveTab(key) ? "page" : undefined}
            >
              {Icon && <Icon className="w-5 h-5" />}
              {label.toUpperCase()}
            </Link>
          ))}
      </div>

      <Outlet />
    </section>
  );
};
