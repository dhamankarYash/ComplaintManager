"use client"

import { CheckCircle, XCircle, AlertCircle, Info, X } from "lucide-react"
import { cn } from "@/lib/utils"

export interface EnhancedToastProps {
  title?: string
  description?: string
  variant?: "default" | "success" | "destructive" | "warning" | "info"
  onClose?: () => void
  className?: string
}

const variantStyles = {
  default: "bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-200 dark:border-gray-700",
  success: "bg-green-50 text-green-900 border-green-200 dark:bg-green-900/20 dark:text-green-100 dark:border-green-800",
  destructive: "bg-red-50 text-red-900 border-red-200 dark:bg-red-900/20 dark:text-red-100 dark:border-red-800",
  warning:
    "bg-yellow-50 text-yellow-900 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-100 dark:border-yellow-800",
  info: "bg-blue-50 text-blue-900 border-blue-200 dark:bg-blue-900/20 dark:text-blue-100 dark:border-blue-800",
}

const iconMap = {
  default: Info,
  success: CheckCircle,
  destructive: XCircle,
  warning: AlertCircle,
  info: Info,
}

export function EnhancedToast({ title, description, variant = "default", onClose, className }: EnhancedToastProps) {
  const Icon = iconMap[variant]

  return (
    <div
      className={cn(
        "group relative flex w-full items-start gap-3 rounded-lg border p-4 shadow-lg animate-slide-in-right backdrop-blur-sm",
        variantStyles[variant],
        className,
      )}
    >
      <Icon className="h-5 w-5 mt-0.5 flex-shrink-0" />
      <div className="flex-1 space-y-1">
        {title && <div className="text-sm font-semibold leading-none tracking-tight">{title}</div>}
        {description && <div className="text-sm opacity-90">{description}</div>}
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="absolute right-2 top-2 rounded-md p-1 text-gray-500 dark:text-gray-400 opacity-0 transition-opacity hover:text-gray-700 dark:hover:text-gray-200 focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  )
}
