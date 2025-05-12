"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Mail, TrendingUp, ArrowUpRight, ArrowDownRight, Activity } from "lucide-react";
import { AvatarInitials } from "@/components/ui/avatar-initials";
import { motion } from "framer-motion";

// Mock data
const stats = {
  totalSubscribers: 100,
  activeSubscribers: 95,
  unsubscribed: 5,
  emailsSent: 25,
  growthRate: 15, // 15% growth
  conversionRate: 65, // 65% conversion
  recentSubscribers: [
    { email: "john@example.com", joinedAt: "2024-03-10", source: "Organic" },
    { email: "jane@example.com", joinedAt: "2024-03-09", source: "Twitter" },
    { email: "mike@example.com", joinedAt: "2024-03-08", source: "LinkedIn" },
  ],
};

export default function OverviewPage() {
  return (
    <div className="space-y-8">
      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-card/50 backdrop-blur-xl border-border/50 relative overflow-hidden group">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Subscribers
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="relative">
            <div className="text-2xl font-bold">{stats.totalSubscribers}</div>
            <div className="flex items-center mt-1">
              <Badge className="bg-green-500/20 text-green-500 hover:bg-green-500/30">
                <TrendingUp className="h-3 w-3 mr-1" />
                +{stats.growthRate}%
              </Badge>
              <span className="text-xs text-muted-foreground ml-2">vs last month</span>
            </div>
            <div className="absolute bottom-0 right-0 h-16 w-16 bg-gradient-to-br from-green-500/20 to-transparent rounded-full blur-xl transition-all duration-500 opacity-0 group-hover:opacity-100" />
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur-xl border-border/50 relative overflow-hidden group">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Active Rate
            </CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="relative">
            <div className="text-2xl font-bold">
              {((stats.activeSubscribers / stats.totalSubscribers) * 100).toFixed(1)}%
            </div>
            <div className="flex items-center mt-1">
              <Badge className="bg-blue-500/20 text-blue-500">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                High Engagement
              </Badge>
            </div>
            <div className="absolute bottom-0 right-0 h-16 w-16 bg-gradient-to-br from-blue-500/20 to-transparent rounded-full blur-xl transition-all duration-500 opacity-0 group-hover:opacity-100" />
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur-xl border-border/50 relative overflow-hidden group">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Unsubscribe Rate
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="relative">
            <div className="text-2xl font-bold">
              {((stats.unsubscribed / stats.totalSubscribers) * 100).toFixed(1)}%
            </div>
            <div className="flex items-center mt-1">
              <Badge variant="secondary" className="bg-muted/50">
                <ArrowDownRight className="h-3 w-3 mr-1" />
                Below Average
              </Badge>
            </div>
            <div className="absolute bottom-0 right-0 h-16 w-16 bg-gradient-to-br from-orange-500/20 to-transparent rounded-full blur-xl transition-all duration-500 opacity-0 group-hover:opacity-100" />
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur-xl border-border/50 relative overflow-hidden group">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Email Performance
            </CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="relative">
            <div className="text-2xl font-bold">{stats.emailsSent}</div>
            <div className="flex items-center mt-1">
              <Badge className="bg-purple-500/20 text-purple-500">
                {stats.conversionRate}% Open Rate
              </Badge>
            </div>
            <div className="absolute bottom-0 right-0 h-16 w-16 bg-gradient-to-br from-purple-500/20 to-transparent rounded-full blur-xl transition-all duration-500 opacity-0 group-hover:opacity-100" />
          </CardContent>
        </Card>
      </div>

      {/* Recent Subscribers */}
      <Card className="bg-card/50 backdrop-blur-xl border-border/50">
        <CardHeader>
          <CardTitle>Recent Subscribers</CardTitle>
          <CardDescription>Latest users who joined the waitlist</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/40">
                  <th className="text-left p-4 text-muted-foreground font-medium">User</th>
                  <th className="text-left p-4 text-muted-foreground font-medium">Email</th>
                  <th className="text-left p-4 text-muted-foreground font-medium">Joined</th>
                  <th className="text-right p-4 text-muted-foreground font-medium">Source</th>
                </tr>
              </thead>
              <tbody>
                {stats.recentSubscribers.map((subscriber, index) => (
                  <motion.tr
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="border-b border-border/40"
                  >
                    <td className="p-4">
                      <AvatarInitials name={subscriber.email} />
                    </td>
                    <td className="p-4">{subscriber.email}</td>
                    <td className="p-4">{subscriber.joinedAt}</td>
                    <td className="p-4 text-right">
                      <Badge variant="secondary" className="bg-muted/50">
                        {subscriber.source}
                      </Badge>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}