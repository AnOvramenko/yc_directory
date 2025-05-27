import React from "react";
import Navbar from "../../components/Navbar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <main className="font-work">
      <Navbar />
      {children}
    </main>
  );
};

export default Layout;
