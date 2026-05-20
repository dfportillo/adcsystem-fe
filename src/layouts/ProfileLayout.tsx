import ProfileTabs from "@/components/profile/ProfileTabs";
import { Outlet } from "react-router-dom";

export default function ProfileLayout() {
  return <>
  <ProfileTabs />
  <Outlet />
  </>;
}
