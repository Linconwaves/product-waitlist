"use client"

import React from "react"
import { motion } from "framer-motion"

export function AnimatedBackground() {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden">
      {/* Main gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-indigo-950 to-slate-950" />
      
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-5 mix-blend-overlay" />
      </div>
      
      {/* Animated particles/blobs */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute h-[300px] w-[300px] rounded-full bg-blue-500/20 blur-[100px]"
          animate={{
            x: ["-20%", "10%", "-10%", "5%", "-20%"],
            y: ["10%", "-10%", "15%", "-5%", "10%"],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          style={{ top: "30%", left: "60%" }}
        />
        
        <motion.div
          className="absolute h-[250px] w-[250px] rounded-full bg-indigo-600/20 blur-[100px]"
          animate={{
            x: ["5%", "-15%", "10%", "-5%", "5%"],
            y: ["-10%", "5%", "-15%", "10%", "-10%"],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          style={{ top: "50%", left: "30%" }}
        />
        
        <motion.div
          className="absolute h-[200px] w-[200px] rounded-full bg-purple-500/20 blur-[100px]"
          animate={{
            x: ["-5%", "15%", "-10%", "5%", "-5%"],
            y: ["15%", "-5%", "10%", "-15%", "15%"],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          style={{ top: "20%", left: "40%" }}
        />
      </div>
    </div>
  )
}