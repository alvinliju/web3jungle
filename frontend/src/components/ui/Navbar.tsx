"use client";

import { usePathname } from "next/navigation";
import  NavbarLanding  from "../NavbarLanding";
import  NavbarListings  from "../NavbarListing";

export function Navbar() {
  const pathname = usePathname();

  if (pathname === "/listings" || pathname === "/submit" || pathname==="/about") {
    return <NavbarListings />;
  }

  return <NavbarLanding />;
}
