import React from "react";

import Footer from "./_components/Footer";

function DashboardLayout({ children }) {
  return (
    <div>
      <img src="./elevate-ai.png" alt="logo" className="h-20 w-28 relative left-36 mb-4" />
      <div className="mx-5 md:mx-20 lg:mx-36">{children}</div>
    </div>
  );
}

export default DashboardLayout;
