"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Car,
  Calendar,
  Users,
  MessageSquare,
  Settings,
  User,
  Bell,
  LogOut,
  ChevronRight,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Vehicle Records", href: "/admin/vehicles", icon: Car },
  { name: "Booking Records", href: "/admin/bookings", icon: Calendar },
  { name: "Customers", href: "/admin/customers", icon: Users },
  { name: "Concerns", href: "/admin/concerns", icon: MessageSquare },
];

const settingsNav = [
  { name: "Profile", href: "/admin/profile", icon: User },
  { name: "Notifications", href: "/admin/notifications", icon: Bell },
  { name: "Logout", href: "/", icon: LogOut },
];

export function AppSidebar() {
  const pathname = usePathname();
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <div className="flex items-center gap-3 px-2 py-2">
          <Image
            src="/car1.jpg"
            alt="JE Cebu Tours Logo"
            width={32}
            height={32}
            className="rounded-lg object-cover shrink-0"
          />
          <span className="text-lg font-bold text-gray-900 dark:text-white group-data-[collapsible=icon]:hidden">
            Admin Panel
          </span>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <SidebarMenuItem key={item.name}>
                    <SidebarMenuButton
                      render={<Link href={item.href} />}
                      isActive={isActive}
                      tooltip={item.name}
                      className={cn(
                        `${isActive ? "text-orange-500" : "data-[active=true]:bg-linear-to-r data-[active=true]:from-orange-500 data-[active=true]:to-orange-600 data-[active=true]:text-white data-[active=true]:shadow-lg data-[active=true]:shadow-orange-500/30 hover:text-orange-600 dark:hover:text-orange-400"}`,
                      )}
                    >
                      <item.icon />
                      <span>{item.name}</span>
                      {/* {isActive && <ChevronRight className="ml-auto w-4 h-4" />} */}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}

              <Collapsible open={settingsOpen} onOpenChange={setSettingsOpen}>
                <SidebarMenuItem>
                  <CollapsibleTrigger
                    render={<SidebarMenuButton tooltip="Settings" />}
                  >
                    <Settings />
                    <span>Settings</span>
                    <ChevronRight
                      className={`ml-auto w-4 h-4 transition-transform ${
                        settingsOpen ? "rotate-90" : "rotate-0"
                      }`}
                    />
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {settingsNav.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                          <SidebarMenuSubItem key={item.name}>
                            <SidebarMenuSubButton
                              render={<Link href={item.href} />}
                              isActive={isActive}
                              className="data-[active=true]:bg-linear-to-r data-[active=true]:from-orange-500 data-[active=true]:to-orange-600 data-[active=true]:text-white"
                            >
                              <item.icon />
                              <span>{item.name}</span>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        );
                      })}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <div className="flex items-center gap-3 px-2 py-2">
          <div className="w-9 h-9 shrink-0 bg-linear-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1 min-w-0 group-data-[collapsible=icon]:hidden">
            <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
              Admin User
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
              admin@jercebutours.com
            </p>
          </div>
        </div>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
