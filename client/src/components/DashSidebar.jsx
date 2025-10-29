import {
  Sidebar,
  SidebarItem,
  SidebarItemGroup,
  SidebarItems,
} from "flowbite-react";
import { HiUser, HiArrowSmRight } from "react-icons/hi";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function DashSidebar() {
    const location = useLocation();
    const [tab, setTab] = useState('');
  
    useEffect(() => {
      const urlParams = new URLSearchParams(location.search);
      const tabFormUrl = urlParams.get('tab');
      if(tabFormUrl) {
        setTab(tabFormUrl)
      }
    }, [location.search])
  return (
    <Sidebar aria-label="Default sidebar example" className="w-full md:w-56">
      <SidebarItems>
        <SidebarItemGroup>
          <SidebarItem href="/dashboard?tab=profile" active={tab === 'profile'} icon={HiUser} label={"User"} labelColor="dark">
            Profile
          </SidebarItem>
          <SidebarItem icon={HiArrowSmRight} className="cursor-pointer">
            Sign Out
          </SidebarItem>
        </SidebarItemGroup>
      </SidebarItems>
    </Sidebar>
  );
}
