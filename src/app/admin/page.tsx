import AdminHeader from "@/components/admin/admin-header";
import AdminSidebar from "@/components/admin/admin-sidebar";
import DashboardCards from "@/components/admin/dashboard-cards";
import { EquipmentAlerts } from "@/components/admin/equipaments-alert";
import OccupancyChart from "@/components/admin/occupancy-chart";
import { PendingFeedback } from "@/components/admin/peding-feedback";
import { RecentPayments } from "@/components/admin/recent-payments";

export default function AdminPage() {
  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        <AdminHeader />
        <main className="flex-1 p-6 space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground">
              Visão geral da operação da academia
            </p>
          </div>

          <DashboardCards />
          <OccupancyChart />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <EquipmentAlerts />
            <PendingFeedback />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <RecentPayments />
          </div>
        </main>
      </div>
    </div>
  );
}
