import AnalyticsCard from "@/components/dashboard/analytics/AnalyticsCard";

import AnalyticsGrid from "@/components/dashboard/analytics/AnalyticsGrid";
import AnalyticsSection from "@/components/dashboard/analytics/AnalyticsSection";
import MiniNav from "@/components/dashboard/UI/MiniNav";

const page = async () => {
  // const labels = [];
  // const ordersCountData = resultObject.map((order) => order.count);
  // console.log("labels", labels);
  // console.log("data", ordersCountData);
  const links = [
    {
      href: "/dashboard",
      label: "Dashboard",
    },
    {
      href: "/orders",
      label: "Orders",
      last: true,
    },
  ];
  return (
    <div>
      <MiniNav links={links} />
      <h1 className="text-4xl font-medium mb-6">Analytics</h1>
      <AnalyticsSection />
    </div>
  );
};

export default page;
