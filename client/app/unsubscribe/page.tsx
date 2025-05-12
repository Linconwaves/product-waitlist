"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle2, AlertCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const unsubscribeReasons = [
  { value: "not-interested", label: "No longer interested" },
  { value: "too-many-emails", label: "Too many emails" },
  { value: "wrong-expectations", label: "Not what I expected" },
  { value: "different-solution", label: "Found a different solution" },
  { value: "other", label: "Other" },
];

export default function Unsubscribe() {
  const [email, setEmail] = useState("");
  const [reason, setReason] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes("@") || !email.includes(".")) {
      setError("Please enter a valid email address");
      return;
    }

    if (!reason) {
      setError("Please select a reason for unsubscribing");
      return;
    }
    
    setError(null);
    setIsSubmitting(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsSubmitted(true);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-background">
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

      <div className="container mx-auto px-4 py-16">
        <Link 
          href="/" 
          className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to home
        </Link>

        <div className="max-w-md mx-auto mt-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-3xl font-semibold tracking-tight text-foreground mb-4">
              Unsubscribe
            </h1>
            <p className="text-muted-foreground mb-8">
              We're sorry to see you go. Please let us know why you're leaving so we can improve our service.
            </p>
          </motion.div>

          {!isSubmitted ? (
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Email address</label>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={cn(
                      "h-14 text-base rounded-2xl bg-secondary/50 border-0 ring-offset-background placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring",
                      error ? "focus-visible:ring-destructive" : ""
                    )}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Reason for unsubscribing</label>
                  <Select value={reason} onValueChange={setReason}>
                    <SelectTrigger className="h-14 text-base rounded-2xl bg-secondary/50 border-0">
                      <SelectValue placeholder="Select a reason" />
                    </SelectTrigger>
                    <SelectContent>
                      {unsubscribeReasons.map((reason) => (
                        <SelectItem
                          key={reason.value}
                          value={reason.value}
                          className="focus:bg-secondary/80"
                        >
                          {reason.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center text-destructive text-sm bg-destructive/10 p-3 rounded-xl"
                >
                  <AlertCircle className="h-4 w-4 mr-2 flex-shrink-0" />
                  {error}
                </motion.div>
              )}

              <Button
                type="submit"
                className="w-full h-14 rounded-xl bg-primary text-primary-foreground hover:opacity-90 transition-opacity text-base font-medium"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-t-transparent" />
                    <span className="ml-2">Processing...</span>
                  </div>
                ) : (
                  "Unsubscribe"
                )}
              </Button>
            </motion.form>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center bg-card/50 backdrop-blur-xl rounded-2xl p-8 border border-border/50"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
              >
                <CheckCircle2 className="h-12 w-12 mx-auto text-green-500 mb-4" />
              </motion.div>
              <h3 className="text-xl font-medium mb-2">Unsubscribed Successfully</h3>
              <p className="text-muted-foreground mb-6">
                You've been removed from our waitlist. Thank you for your feedback - it helps us improve our service.
              </p>
              <div className="space-y-4">
                <Button
                  variant="outline"
                  className="w-full border-border hover:bg-secondary/80"
                  onClick={() => {
                    setEmail("");
                    setReason("");
                    setIsSubmitted(false);
                  }}
                >
                  Unsubscribe another email
                </Button>
                <Link href="/" className="block">
                  <Button
                    variant="ghost"
                    className="w-full hover:bg-secondary/50"
                  >
                    Return to homepage
                  </Button>
                </Link>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </main>
  );
}