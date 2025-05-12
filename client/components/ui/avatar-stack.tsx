"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface AvatarStackProps {
  users: {
    initials: string
    color: string
  }[]
  count?: number
  className?: string
}

export function AvatarStack({ users, count, className }: AvatarStackProps) {
  return (
    <div className={cn("flex items-center", className)}>
      <div className="flex -space-x-2">
        {users.slice(0, 3).map((user, index) => (
          <div
            key={index}
            className={cn(
              "relative flex h-9 w-9 shrink-0 select-none items-center justify-center rounded-full text-sm font-medium text-white ring-2 ring-background",
              user.color
            )}
          >
            {user.initials}
          </div>
        ))}
      </div>
      {count && (
        <span className="ml-3 text-sm font-medium text-white">
          {count}+ people on the waitlist
        </span>
      )}
    </div>
  )
}