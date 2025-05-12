"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Sidebar } from "@/components/ui/sidebar";
import { Header } from "@/components/ui/header";
import { Toaster } from "sonner";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
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

  return (
    <>
      <Sidebar />
      <Header />
      <main className="pl-64 pt-16">
        <div className="p-8">
          {children}
        </div>
      </main>
      <Toaster />
    </>
  );
}