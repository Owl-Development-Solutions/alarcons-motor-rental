import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "./admin-sidebar";
import { requireRole } from "@/guard/auth-guard";
import { getAdminNotifications } from "@/data/actions/notification";
import AdminNotifications from "@/components/admin/admin-notifications";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireRole("admin");
  const { notifications } = await getAdminNotifications();

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="overflow-x-hidden">
        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm border-b border-gray-200 dark:border-slate-700">
          <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
            <SidebarTrigger />

            <div className="flex items-center gap-4 ml-auto">
              <AdminNotifications
                notifications={notifications}
              />
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-4 sm:p-6 lg:p-8 overflow-auto">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
