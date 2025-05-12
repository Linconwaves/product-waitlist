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
import { Search, Download } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { AvatarInitials } from "@/components/ui/avatar-initials";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

// Mock data
const mockSubscribers = [
  { email: "john@example.com", joinedAt: "2024-01-01", active: true },
  { email: "jane@example.com", joinedAt: "2024-01-02", active: true },
  { email: "bob@example.com", joinedAt: "2024-01-03", active: false },
];

export default function SubscribersPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredSubscribers = mockSubscribers.filter((sub) =>
    sub.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleExport = async (format: "csv" | "json" | "excel") => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      let fileName = `subscribers_${new Date().toISOString().split("T")[0]}`;
      let content = "";

      switch (format) {
        case "csv":
          content =
            "Email,Joined Date,Status\n" +
            filteredSubscribers
              .map(
                (sub) =>
                  `${sub.email},${sub.joinedAt},${
                    sub.active ? "Active" : "Inactive"
                  }`
              )
              .join("\n");
          fileName += ".csv";
          break;
        case "json":
          content = JSON.stringify(filteredSubscribers, null, 2);
          fileName += ".json";
          break;
        case "excel":
          content =
            "Email\tJoined Date\tStatus\n" +
            filteredSubscribers
              .map(
                (sub) =>
                  `${sub.email}\t${sub.joinedAt}\t${
                    sub.active ? "Active" : "Inactive"
                  }`
              )
              .join("\n");
          fileName += ".xlsx";
          break;
      }

      const blob = new Blob([content], { type: "text/plain" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      toast.success(`Successfully exported subscribers as ${format.toUpperCase()}`);
    } catch {
      toast.error("Failed to export subscribers");
    }
  };

  return (
    <div className="space-y-8">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-card/50 backdrop-blur-xl border-border/50">
          <CardHeader>
            <CardTitle>Total Subscribers</CardTitle>
            <CardDescription>Current waitlist size</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{mockSubscribers.length}</p>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur-xl border-border/50">
          <CardHeader>
            <CardTitle>Active Subscribers</CardTitle>
            <CardDescription>Currently active on waitlist</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">
              {mockSubscribers.filter((sub) => sub.active).length}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Table & Controls */}
      <Card className="bg-card/50 backdrop-blur-xl border-border/50">
        <CardHeader>
          <div className="flex items-center">
            <CardTitle>Subscribers</CardTitle>

            {/* controls on the far right */}
            <div className="flex items-center space-x-4 ml-auto">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Download className="h-4 w-4" />
                    Export
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem onClick={() => handleExport("csv")}>
                    Export as CSV
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleExport("json")}>
                    Export as JSON
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleExport("excel")}>
                    Export as Excel
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search subscribers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-secondary/50 border-0"
                />
              </div>
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
                    Joined
                  </th>
                  <th className="text-right p-4 pl-0 text-muted-foreground font-medium">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredSubscribers.map((subscriber, idx) => (
                  <tr key={idx} className="border-b border-border/40">
                    <td className="p-4">
                      <AvatarInitials name={subscriber.email} />
                    </td>
                    <td className="p-4">{subscriber.email}</td>
                    <td className="p-4">{subscriber.joinedAt}</td>
                    <td className="p-4 pr-4 pl-0 text-right">
                      {subscriber.active ? (
                        <Badge className="bg-green-500/20 text-green-500 hover:bg-green-500/30">
                          Active
                        </Badge>
                      ) : (
                        <Badge variant="secondary" className="bg-muted/50">
                          Inactive
                        </Badge>
                      )}
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