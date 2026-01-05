import { useEffect, useState } from "react";
import { FiLogOut, FiMenu } from "react-icons/fi";
import { TiChevronRight } from "react-icons/ti";
import { SidebarItem } from "./sidebar-item";

export type SidebarItem = {
  label: string,
  icon: React.ReactNode,
  goTo: string
}

export type NavItem = {
  title: string;
  sidebarItems?: SidebarItem[];
};


export default function Sidebar({ title, sidebarItems }: NavItem) {
  const [collapsed, setCollapsed] = useState<boolean>(window.innerWidth < 768);
  
  const LOGOUT: SidebarItem = {
    label: "Log Out",
    icon: <FiLogOut />,
    goTo: "",
  }

  // useEffect(() => {
  //   const handleResize = () => {
  //     setCollapsed(window.innerWidth < 768);
  //   };
  //   window.addEventListener("resize", handleResize);
  //   return () => window.removeEventListener("resize", handleResize);
  // }, []);

  const handleToggle = () => {
    setCollapsed((prev) => !prev);
  };

  const handleLogout = () => {
    console.log("Logging out...");
  };

  return (
    <aside
      className={`flex flex-col bg-neutral-300 text-gray-700 h-100vh transition-all duration-300 ${
        collapsed ? "w-20" : "w-84"
      }`}
    >
      {/* Logo + Toggle */}
      <div className={`flex items-center border-b border-neutral-400 p-4 ${collapsed ? "justify-center" : "justify-between"}`}>
        {!collapsed && (
          <div className="flex items-center justify-center gap-2 font-bold text-lg">
            <TiChevronRight className="text-2xl self-center text-gray-600" />
            <span>{title}</span>
          </div>
        )}
        <button
          onClick={handleToggle}
          aria-label="Toggle menu"
          className="text-gray-600 hover:text-black text-2xl p-1 focus:outline-none"
        >
          <FiMenu />
        </button>
      </div>

      {/* Sidebar Items */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <ul className="flex-1 flex flex-col gap-1 overflow-hidden">
          {sidebarItems?.map((item, index) => (
            <SidebarItem key={index} item={item} collapsed={collapsed}/>
          ))}
        </ul>

        <div
          onClick={handleLogout}
          className="border-t border-neutral-400 cursor-pointer"
        >
          <SidebarItem item={LOGOUT} collapsed={collapsed}/>
        </div>
      </div>
    </aside>
  );
}
