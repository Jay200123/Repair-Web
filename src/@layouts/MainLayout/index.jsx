import { Navbar, Footer } from "@components";
import { Outlet } from "react-router-dom";
import { AnimatePresence } from "motion/react";
import { useLocation } from "react-router-dom";

export default function MainLayout() {
  const location = useLocation();

  return (
    <>
      <AnimatePresence mode="wait">
        <main className="min-h-screen flex flex-col">
          <Navbar />
          <div key={location.pathname}>
            <Outlet />
          </div>
          <Footer />
        </main>
      </AnimatePresence>
    </>
  );
}
