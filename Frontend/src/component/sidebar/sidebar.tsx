import { useState } from "react";
import { FiLogOut, FiMenu } from "react-icons/fi";
import { BiSolidCat } from "react-icons/bi";
import { SidebarItem } from "./sidebar-item";
import { useAuthContext } from "../../context/auth-context";
import { useNavigate } from "react-router-dom";

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
  const { logout } = useAuthContext();
  const [collapsed, setCollapsed] = useState<boolean>(window.innerWidth < 768);
  const navigate = useNavigate();
  
  const LOGOUT: SidebarItem = {
    label: "Log Out",
    icon: <FiLogOut size={24} />,
    goTo: "",
  }

  const handleToggle = () => {
    setCollapsed((prev) => !prev);
  };

  const handleLogout = () => {
    logout();
    navigate("/", {replace: true});
  };

  return (
    <aside
      className={`flex flex-col bg-neutral-300 text-gray-700 h-screen transition-[width] duration-500 ease-in-out ${
        collapsed ?  "w-20" : "w-sm"
      }`}
    >
      {/* Logo + Toggle */}
      <div className={`flex items-center border-b border-neutral-400 p-4 
          ${collapsed ? "justify-center" : "justify-between"}`}
      >
        {!collapsed && (
          <div className="flex items-center gap-2 font-bold text-lg transition-opacity duration-500 ease-in-out">
            <BiSolidCat size={32} className="text-2xl self-center text-blue-700" />
            <span>{title}</span>
          </div>
        )}
        <button
          onClick={handleToggle}
          aria-label="Toggle menu"
          className="text-gray-600 hover:text-black text-2xl p-1 focus:outline-none transition-colors duration-200 cursor-pointer"
        >
          <FiMenu size={26} />
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
