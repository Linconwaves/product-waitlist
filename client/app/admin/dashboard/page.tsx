"use client";

import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const router = useRouter();

  // Redirect to overview page by default
  router.push("/admin/dashboard/overview");

  return null;
}