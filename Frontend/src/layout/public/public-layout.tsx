import { Outlet } from "react-router-dom";
import Banner from "../../component/banner/banner";
import { useAuthContext } from "../../context/auth-context";

export default function PublicLayout() {
  const {status, clearStatus} = useAuthContext();

  console.log(status?.type);
  
  return ( 
    <div className="container mx-auto max-w-7xl">
      <Banner clearStatus={clearStatus} message={status?.message} status={status?.type ?? null}/>
      <Outlet />
    </div>
  );
}