"use client";

import { motion } from "framer-motion";
import { WaitlistForm } from "@/components/waitlist-form";
import { SocialIcons } from "@/components/social-icons";
import { CountdownTimer } from "@/components/countdown-timer";
import { AvatarStack } from "@/components/ui/avatar-stack";

// Set launch date 30 days from now
const launchDate = new Date();
launchDate.setDate(launchDate.getDate() + 30);

// Sample users for avatar stack
const waitlistUsers = [
  { initials: "JD", color: "bg-zinc-800 dark:bg-zinc-200" },
  { initials: "AS", color: "bg-zinc-700 dark:bg-zinc-300" },
  { initials: "MK", color: "bg-zinc-600 dark:bg-zinc-400" },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-background" />
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-semibold tracking-tight text-balance text-foreground">
              Something
              <br />
              <span className="text-gradient">extraordinary</span>
              <br />
              is coming.
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Be among the first to experience our product.
              Join thousands already on the waitlist.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mt-12"
          >
            <CountdownTimer targetDate={launchDate} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mt-12 max-w-md mx-auto"
          >
            <WaitlistForm />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mt-8"
          >
            <AvatarStack users={waitlistUsers} count={100} />
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 hero-gradient" />
      </section>

      {/* Footer */}
      <footer className="absolute bottom-0 w-full py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center space-y-4">
            <SocialIcons />
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Product Name. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}