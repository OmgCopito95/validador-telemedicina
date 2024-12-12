import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { useQuery } from "@tanstack/react-query";

import "../styles/layout.css";
import "../styles/data-table.css";

function Layout() {
  // const { data, isFetched } = useQuery({
  //   queryKey: ["tramitesCount"],
  // });

  return (
    <div className="layout-container">
      {/* <Header data={data} isFetched={isFetched} /> */}
      <div className="children-container">
        {/* <Outlet context={{ data, isFetched }} /> */}
      </div>
      <Footer />
    </div>
  );
}

export default Layout;
