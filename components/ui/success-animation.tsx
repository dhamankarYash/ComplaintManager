"use client"

import * as React from "react"
import { CheckCircle, Sparkles, X } from "lucide-react"
import { cn } from "@/lib/utils"

interface SuccessAnimationProps {
  show: boolean
  title?: string
  description?: string
  onComplete?: () => void
  className?: string
}

export function SuccessAnimation({
  show,
  title = "Success!",
  description,
  onComplete,
  className,
}: SuccessAnimationProps) {
  React.useEffect(() => {
    if (show && onComplete) {
      const timer = setTimeout(onComplete, 3000)
      return () => clearTimeout(timer)
    }
  }, [show, onComplete])

  if (!show) return null

  return (
    <div className={cn("fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm", className)}>
      <div className="relative bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-2xl animate-bounce-in max-w-md mx-4">
        <div className="text-center space-y-4">
          <div className="relative mx-auto w-16 h-16">
            <CheckCircle className="w-16 h-16 text-green-500 animate-pulse-slow" />
            <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-yellow-400 animate-bounce" />
            <Sparkles className="absolute -bottom-2 -left-2 w-4 h-4 text-blue-400 animate-bounce delay-300" />
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-green-600 dark:text-green-400">{title}</h3>
            {description && <p className="text-gray-600 dark:text-gray-300">{description}</p>}
          </div>
        </div>
        {onComplete && (
          <button
            onClick={onComplete}
            className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <X className="h-4 w-4 text-gray-500" />
          </button>
        )}
      </div>
    </div>
  )
}
