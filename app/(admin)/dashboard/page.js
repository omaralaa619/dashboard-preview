import AnalyticsGrid from "@/components/dashboard/analytics/AnalyticsGrid";
import OrdersTable from "@/components/dashboard/tables/orders/OrdersTable";
import { Suspense } from "react";

const page = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <h1 className="text-4xl font-medium">Dashboard</h1>

      <AnalyticsGrid duration={6} />
      <Suspense fallback={<div>Loading...</div>}>
        <OrdersTable />
      </Suspense>
    </div>
  );
};

export default page;
