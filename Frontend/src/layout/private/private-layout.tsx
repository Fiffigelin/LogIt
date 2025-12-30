import { Outlet } from "react-router-dom";
import { useAuthContext } from "../../context/auth-context";

export default function PrivateLayout() {
  const { user } = useAuthContext();
  console.log(user);

  if (!user?.user) {
    return <p>Loading...</p>;
  }

  // const navItems: SidebarItemProps[] = [
  //   { label: "Dashboard", icon: <IoGridOutline />, to: "/dashboard" },
  //   { label: "Vocabularies", icon: <TbVocabulary />, to: "/vocabulary" },
  // ];
  return (
    <>
      {/* <Sidebar title="" sidebarItems={navItems} /> */}
      <div className="content">
        <Outlet context={{ user: user.user }} />
      </div>
    </>
  );
}
