import { Outlet } from "react-router-dom";
import { useAuthContext } from "../../context/auth-context";
import Sidebar, { type SidebarItem } from "../../component/sidebar/sidebar";
import { IoGridOutline } from "react-icons/io5";
import { TbVocabulary } from "react-icons/tb";
import Header from "../../component/header/header";

export default function PrivateLayout() {
  const { user } = useAuthContext();

  if (!user) {
    return <p>Loading...</p>;
  }

  const navItems: SidebarItem[] = [
    { label: "Dashboard", icon: <IoGridOutline size={24} />, goTo: "/home" },
    { label: "Page 2", icon: <TbVocabulary size={24} />, goTo: "/page-2" },
  ];
  
  return (
    <div className="min-h-screen min-w-screen overflow-y-hidden flex">
      <Sidebar title="" sidebarItems={navItems} />
      <section className="w-full flex flex-col bg-neutral-50">
        <Header name={user.username} />
        <Outlet context={{ user: user }} />
      </section>
    </div>
  );
}
