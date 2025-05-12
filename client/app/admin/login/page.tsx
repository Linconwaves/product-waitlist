"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AlertCircle } from "lucide-react";
import Image from "next/image";

export default function AdminLogin() {
  const router = useRouter();
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      if (credentials.username === "admin" && credentials.password === "password") {
        localStorage.setItem("admin_token", "dummy_token");
        router.push("/admin/dashboard");
      } else {
        setError("Invalid credentials");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      {/* Background gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-background via-background to-secondary/20 -z-10" />
      
      {/* Animated background shapes */}
      <div className="fixed inset-0 overflow-hidden -z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ duration: 2 }}
          className="absolute h-[500px] w-[500px] rounded-full bg-primary/10 blur-[100px]"
          style={{ top: '20%', left: '60%' }}
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
          transition={{ duration: 2, delay: 0.5 }}
          className="absolute h-[400px] w-[400px] rounded-full bg-secondary/20 blur-[100px]"
          style={{ top: '60%', left: '30%' }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-[400px]"
      >
        <div className="relative backdrop-blur-xl bg-card/20 rounded-3xl p-8 shadow-2xl border border-border/10">
          {/* Subtle inner glow */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-white/5 to-transparent" />
          
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-center mb-8"
            >
              <div className="flex justify-center mb-6">
                <div className="relative w-16 h-16">
                  <Image
                    src="/email-logo.svg"
                    alt="Logo"
                    fill
                    className="text-primary dark:text-white"
                    priority
                  />
                </div>
              </div>
              <h1 className="text-3xl font-semibold bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70">
                Welcome Back
              </h1>
              <p className="text-muted-foreground/80 mt-2">
                Sign in to access your dashboard
              </p>
            </motion.div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                <Input
                  type="text"
                  placeholder="Username"
                  value={credentials.username}
                  onChange={(e) => setCredentials(prev => ({ ...prev, username: e.target.value }))}
                  className="h-14 bg-secondary/50 border-0 rounded-2xl text-base placeholder:text-muted-foreground/60 px-6"
                  required
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                <Input
                  type="password"
                  placeholder="Password"
                  value={credentials.password}
                  onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                  className="h-14 bg-secondary/50 border-0 rounded-2xl text-base placeholder:text-muted-foreground/60 px-6"
                  required
                />
              </motion.div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center bg-destructive/10 text-destructive text-sm p-4 rounded-2xl"
                >
                  <AlertCircle className="h-4 w-4 mr-2 flex-shrink-0" />
                  <span>{error}</span>
                </motion.div>
              )}

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                <Button
                  type="submit"
                  className="w-full h-14 rounded-2xl bg-gradient-to-br from-primary to-primary/90 text-primary-foreground hover:opacity-90 transition-opacity text-base font-medium"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-t-transparent" />
                      <span className="ml-2">Signing in...</span>
                    </div>
                  ) : (
                    "Sign in"
                  )}
                </Button>
              </motion.div>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
}