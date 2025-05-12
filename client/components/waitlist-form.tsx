"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { CheckCircle2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccessDialogOpen, setIsSuccessDialogOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    if (isSuccessDialogOpen) {
      timeoutId = setTimeout(() => {
        setIsSuccessDialogOpen(false);
        setEmail("");
      }, 10000);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [isSuccessDialogOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes("@") || !email.includes(".")) {
      setError("Please enter a valid email address");
      return;
    }
    
    setError(null);
    setIsSubmitting(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsSuccessDialogOpen(true);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddAnother = () => {
    setEmail("");
    setIsSuccessDialogOpen(false);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="relative flex items-center">
          <Input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={cn(
              "h-14 pl-6 pr-36 text-base rounded-2xl bg-secondary border-0 ring-offset-background placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring",
              error ? "focus-visible:ring-destructive" : ""
            )}
            required
          />
          <Button
            type="submit"
            className="absolute right-1 top-1 h-12 px-8 rounded-xl bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <div className="flex items-center">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-t-transparent" />
                <span className="ml-2">Joining...</span>
              </div>
            ) : (
              "Notify me"
            )}
          </Button>
        </div>
        
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center text-destructive text-sm mt-2"
          >
            <AlertCircle className="h-4 w-4 mr-1" />
            {error}
          </motion.div>
        )}

        <p className="text-sm text-muted-foreground text-center">
          You can unsubscribe at any time.{" "}
          <Link href="/unsubscribe" className="underline hover:text-foreground transition-colors">
            Unsubscribe here
          </Link>
        </p>
      </form>

      <Dialog open={isSuccessDialogOpen} onOpenChange={setIsSuccessDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex flex-col items-center text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
              >
                <CheckCircle2 className="h-12 w-12 text-green-500 mb-4" />
              </motion.div>
              <DialogTitle className="text-xl font-medium mb-2">
                You're on the list!
              </DialogTitle>
              <DialogDescription className="text-muted-foreground">
                We'll notify you when we launch. Get ready for something extraordinary.
              </DialogDescription>
            </div>
          </DialogHeader>
          <div className="flex justify-center mt-4">
            <Button
              variant="outline"
              className="border-border hover:bg-secondary"
              onClick={handleAddAnother}
            >
              Add another email
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}