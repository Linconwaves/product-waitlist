"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { toast } from "sonner";

export function Header() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    toast.success("Logged out successfully");
    router.push("/admin/login");
  };

  return (
    <header className="fixed top-0 right-0 left-64 h-16 bg-card/50 backdrop-blur-xl border-b border-border/50 z-10">
      <div className="h-full flex items-center justify-end px-6">
        <Button
          variant="ghost"
          onClick={handleLogout}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <LogOut className="h-4 w-4" />
          <span>Logout</span>
        </Button>
      </div>
    </header>
  );
}