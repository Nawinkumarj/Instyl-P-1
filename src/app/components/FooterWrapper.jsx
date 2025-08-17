"use client";

import { usePathname } from "next/navigation";
import Footer from "./Footer";

export default function FooterWrapper() {
  const pathname = usePathname();

  // pages where footer should be hidden
  const noFooterRoutes = ["/Pricelist", "/Membership"];

  if (noFooterRoutes.includes(pathname)) {
    return null;
  }

  return <Footer />;
}
