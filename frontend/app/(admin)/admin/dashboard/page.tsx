import { AdminDashboard } from "@/components/admin/admin-dashboard";
import { getAdminDashboard } from "@/data/actions/dashboard";

export default async function DashboardPage() {
  return <AdminDashboard dashboard={await getAdminDashboard()} />;
}
