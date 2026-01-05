import { NavLink } from "react-router-dom";
import { type SidebarItem } from "./sidebar";

export type SidebarItemProps = {
  item: SidebarItem,
  collapsed: boolean
};

export function SidebarItem({ item, collapsed }: SidebarItemProps) {
  return (
    <li className={`${collapsed && "min-w-20"} w-full bg-neutral-300 text-gray-700 h-14`}>
      <NavLink
        to={item.goTo}
        className={({ isActive }) =>
          `flex items-center gap-3 p-4 rounded transition-colors duration-200 
          ${isActive && "bg-neutral-200 font-semibold text-blue-700"}
          ${collapsed && "justify-center"}`
        }
      >
        <span className="text-xl shrink-0">{item.icon}</span>
        { !collapsed && 
          <span className="flex-1 transition-opacity duration-400 truncate">{item.label}</span>
        }
      </NavLink>
    </li>
  );
}
