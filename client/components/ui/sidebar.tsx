"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  Users,
  Mail,
  Settings,
  XCircle,
  LayoutDashboard,
  ChevronRight,
} from "lucide-react";

const menuItems = [
  {
    title: "Overview",
    icon: LayoutDashboard,
    href: "/admin/dashboard",
  },
  {
    title: "Subscribers",
    icon: Users,
    href: "/admin/dashboard/subscribers",
  },
  {
    title: "Unsubscribed",
    icon: XCircle,
    href: "/admin/dashboard/unsubscribed",
  },
  {
    title: "Email",
    icon: Mail,
    href: "/admin/dashboard/email",
  },
  {
    title: "Settings",
    icon: Settings,
    href: "/admin/dashboard/settings",
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="fixed left-0 top-0 bottom-0 w-64 bg-card/50 backdrop-blur-xl border-r border-border/50">
      {/* Logo area */}
      <div className="h-16 flex items-center px-6 border-b border-border/50">
        <h1 className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
          Admin Panel
        </h1>
      </div>

      {/* Navigation */}
      <nav className="p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-xl text-muted-foreground transition-colors relative group",
                    isActive && "text-foreground bg-secondary/50"
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute inset-0 bg-secondary/50 rounded-xl"
                      initial={false}
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 30,
                      }}
                    />
                  )}
                  <Icon className="h-5 w-5" />
                  <span className="flex-1 relative">{item.title}</span>
                  <ChevronRight
                    className={cn(
                      "h-4 w-4 opacity-0 -translate-x-2 transition-all",
                      "group-hover:opacity-100 group-hover:translate-x-0",
                      isActive && "opacity-100 translate-x-0"
                    )}
                  />
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Bottom area */}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <div className="p-4 rounded-xl bg-secondary/50 backdrop-blur-sm">
          <p className="text-sm text-muted-foreground">
            Welcome to your admin dashboard. Manage your waitlist and settings here.
          </p>
        </div>
      </div>
    </div>
  );
}