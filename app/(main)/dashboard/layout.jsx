import React, { Suspense } from "react";
import { BarLoader } from "react-spinners";
import DashboardPage from "./page";

const DashboardLayout = () => {
  return (
    <div className="px-5">
      <h1 className="text-6xl font-bold gradient-title mb-5">Dashboard</h1>

      <Suspense fallback={<BarLoader />}>
        <DashboardPage />
      </Suspense>
    </div>
  );
};

export default DashboardLayout;
