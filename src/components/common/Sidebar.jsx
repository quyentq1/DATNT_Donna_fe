import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Heart, 
  Users, 
  Calendar, 
  Settings, 
  User,
  BarChart3,
  FileText
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";

// Menu items for DonaTrust application
const items = [
  {
    title: "Dashboard",
    url: "/",
    icon: Home,
  },
  {
    title: "Campaigns",
    url: "/campaigns",
    icon: Heart,
  },
  {
    title: "Campaigns Pending",
    url: "/charity-pending",
    icon: FileText,
  },
  {
    title: "Profile",
    url: "/profile",
    icon: User,
  },
  {
    title: "News Management",
    url: "/admin/news",
    icon: FileText,
  },
];

export function AppSidebar() {
  const location = useLocation();

  return (
    <Sidebar>
      <SidebarContent>
        {/* Logo Section */}
        {/* <div className="flex items-center justify-center mb-8 p-4">
          <img
            src="/images/img_top.png"
            alt="DonaTrust Logo"
            className="w-32 h-auto object-contain"
          />
        </div> */}

        <SidebarGroup>
          <SidebarGroupLabel>Main Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const isActive = location.pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton 
                      asChild
                      className={isActive ? "bg-blue-50 text-blue-700 border-r-2 border-blue-700" : ""}
                    >
                      <Link to={item.url} className="flex items-center space-x-3">
                        <item.icon className="w-5 h-5" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

export default AppSidebar; 