"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, UserMinus, TrendingDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { AvatarInitials } from "@/components/ui/avatar-initials";

// Mock data
const mockUnsubscribers = [
  {
    email: "alice@example.com",
    unsubscribedAt: "2024-01-04",
    reason: "No longer interested",
    lastActive: "2023-12-30",
  },
  {
    email: "charlie@example.com",
    unsubscribedAt: "2024-01-05",
    reason: "Too many emails",
    lastActive: "2024-01-03",
  },
  {
    email: "david@example.com",
    unsubscribedAt: "2024-01-06",
    reason: "Other",
    lastActive: "2024-01-01",
  },
];

export default function UnsubscribedPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredUnsubscribers = mockUnsubscribers.filter(
    (sub) =>
      sub.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sub.reason.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const unsubscribeRate = (
    (mockUnsubscribers.length / 100) *
    100
  ).toFixed(1); // Assuming 100 total subscribers

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="bg-card/50 backdrop-blur-xl border-border/50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Unsubscribes
            </CardTitle>
            <UserMinus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockUnsubscribers.length}</div>
            <div className="flex items-center mt-1">
              <Badge variant="secondary" className="bg-muted/50">
                <TrendingDown className="h-3 w-3 mr-1" />
                Last 30 days
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur-xl border-border/50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Unsubscribe Rate
            </CardTitle>
            <TrendingDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{unsubscribeRate}%</div>
            <div className="flex items-center mt-1">
              <Badge
                className={
                  Number(unsubscribeRate) > 5
                    ? "bg-red-500/20 text-red-500"
                    : "bg-green-500/20 text-green-500"
                }
              >
                Industry avg. 5%
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-card/50 backdrop-blur-xl border-border/50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Unsubscribed Users</CardTitle>
              <CardDescription>
                Users who have opted out of the waitlist
              </CardDescription>
            </div>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search unsubscribes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-secondary/50 border-0"
              />
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div className="rounded-lg overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="border-b border-border/40">
                  <th className="text-left p-4 text-muted-foreground font-medium">
                    User
                  </th>
                  <th className="text-left p-4 text-muted-foreground font-medium">
                    Email
                  </th>
                  <th className="text-left p-4 text-muted-foreground font-medium">
                    Last Active
                  </th>
                  <th className="text-right p-4 pl-0 text-muted-foreground font-medium">
                    Unsubscribed
                  </th>
                  <th className="text-right p-4 pl-0 text-muted-foreground font-medium">
                    Reason
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredUnsubscribers.map((u, idx) => (
                  <tr key={idx} className="border-b border-border/40">
                    <td className="p-4">
                      <AvatarInitials name={u.email} />
                    </td>
                    <td className="p-4">{u.email}</td>
                    <td className="p-4">{u.lastActive}</td>
                    <td className="p-4 text-right pl-0">{u.unsubscribedAt}</td>
                    <td className="p-4 text-right pl-0">
                      <Badge variant="secondary" className="bg-muted/50">
                        {u.reason}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}