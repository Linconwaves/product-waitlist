"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem("admin_token");
    if (!token && pathname !== "/admin/login") {
      router.push("/admin/login");
    } else if (token) {
      setIsAuthenticated(true);
    }
  }, [pathname, router]);

  if (!isAuthenticated && pathname !== "/admin/login") {
    return null;
  }

  return <>{children}</>;
}