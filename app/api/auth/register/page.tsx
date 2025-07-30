"use client"

import type React from "react"
import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { useAuth } from "@/hooks/use-auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { Loader2, Eye, EyeOff, Mail, Lock, UserPlus, Shield, User } from "lucide-react"
import { SuccessAnimation } from "@/components/ui/success-animation"

export default function RegisterPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [errors, setErrors] = useState<{ email?: string; password?: string; confirmPassword?: string }>({})
  const { register } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()

  const registerType = searchParams.get("type") || "user"
  const isAdminRegister = registerType === "admin"

  const validateForm = () => {
    const newErrors: { email?: string; password?: string; confirmPassword?: string } = {}

    if (!email) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email address"
    }

    if (!password) {
      newErrors.password = "Password is required"
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters"
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
      newErrors.password = "Password must contain uppercase, lowercase, and number"
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password"
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setLoading(true)

    try {
      const success = await register(email, password, isAdminRegister ? "admin" : "user")
      if (success) {
        setShowSuccess(true)
        toast({
          title: `${isAdminRegister ? "Admin" : "User"} Account Created! 🎉`,
          description: `Welcome to ComplaintMS! Your ${isAdminRegister ? "admin" : "user"} account has been created successfully.`,
          variant: "success",
        })

        setTimeout(() => {
          router.push(isAdminRegister ? "/admin" : "/")
        }, 3000)
      } else {
        toast({
          title: "Registration Failed ❌",
          description: "This email might already be in use or there was an error creating your account.",
          variant: "destructive",
        })

        // Add shake animation to form
        const form = document.querySelector("form")
        form?.classList.add("animate-shake")
        setTimeout(() => form?.classList.remove("animate-shake"), 500)
      }
    } catch (error) {
      toast({
        title: "Connection Error 🔌",
        description: "Unable to connect to the server. Please check your internet connection and try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-purple-900/20 dark:to-indigo-900/20 flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-2xl rounded-2xl border-0 animate-fade-in-down">
          <CardHeader className="text-center pb-6 space-y-2">
            <div
              className={`w-16 h-16 ${isAdminRegister ? "bg-gradient-to-br from-orange-500 to-red-500" : "bg-gradient-to-br from-purple-500 to-blue-600"} rounded-2xl flex items-center justify-center mx-auto mb-4`}
            >
              {isAdminRegister ? <Shield className="h-8 w-8 text-white" /> : <User className="h-8 w-8 text-white" />}
            </div>
            <CardTitle
              className={`text-3xl font-bold ${isAdminRegister ? "bg-gradient-to-r from-orange-600 to-red-600" : "bg-gradient-to-r from-purple-600 to-blue-600"} bg-clip-text text-transparent`}
            >
              {isAdminRegister ? "Admin Registration 🛡️" : "Join ComplaintMS ✨"}
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-300">
              {isAdminRegister
                ? "Create your admin account to manage complaints"
                : "Create your account to start managing complaints efficiently"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700 dark:text-gray-300 font-medium">
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value)
                      if (errors.email) setErrors({ ...errors, email: undefined })
                    }}
                    placeholder="your@example.com"
                    className={`pl-10 transition-all duration-200 focus:ring-2 ${isAdminRegister ? "focus:ring-orange-500" : "focus:ring-purple-500"} bg-white/50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600 rounded-xl ${
                      errors.email ? "border-red-500 focus:ring-red-500" : ""
                    }`}
                  />
                </div>
                {errors.email && <p className="text-red-500 text-sm mt-1 animate-fade-in-up">{errors.email}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-700 dark:text-gray-300 font-medium">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value)
                      if (errors.password) setErrors({ ...errors, password: undefined })
                    }}
                    placeholder="Create a strong password"
                    className={`pl-10 pr-10 transition-all duration-200 focus:ring-2 ${isAdminRegister ? "focus:ring-orange-500" : "focus:ring-purple-500"} bg-white/50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600 rounded-xl ${
                      errors.password ? "border-red-500 focus:ring-red-500" : ""
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {errors.password && <p className="text-red-500 text-sm mt-1 animate-fade-in-up">{errors.password}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-gray-700 dark:text-gray-300 font-medium">
                  Confirm Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value)
                      if (errors.confirmPassword) setErrors({ ...errors, confirmPassword: undefined })
                    }}
                    placeholder="Confirm your password"
                    className={`pl-10 pr-10 transition-all duration-200 focus:ring-2 ${isAdminRegister ? "focus:ring-orange-500" : "focus:ring-purple-500"} bg-white/50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600 rounded-xl ${
                      errors.confirmPassword ? "border-red-500 focus:ring-red-500" : ""
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1 animate-fade-in-up">{errors.confirmPassword}</p>
                )}
              </div>

              <Button
                type="submit"
                className={`w-full py-3 text-lg font-semibold ${isAdminRegister ? "bg-gradient-to-r from-orange-500 to-red-500" : "gradient-primary"} text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-0.5 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed`}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Creating Account...
                  </>
                ) : (
                  <>
                    <UserPlus className="mr-2 h-5 w-5" />
                    Create {isAdminRegister ? "Admin" : "User"} Account
                  </>
                )}
              </Button>
            </form>

            <div className="mt-6 text-center space-y-3">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Already have an account?{" "}
                <Link
                  href={`/auth/login?type=${registerType}`}
                  className={`${isAdminRegister ? "text-orange-600 hover:text-orange-700 dark:text-orange-400 dark:hover:text-orange-300" : "text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300"} font-semibold hover:underline transition-colors`}
                >
                  Sign in here →
                </Link>
              </p>
              <div className="flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                <span>Switch to:</span>
                <Link
                  href={`/auth/register?type=${isAdminRegister ? "user" : "admin"}`}
                  className={`${isAdminRegister ? "text-blue-600 hover:text-blue-700" : "text-orange-600 hover:text-orange-700"} font-medium hover:underline transition-colors`}
                >
                  {isAdminRegister ? "User Registration" : "Admin Registration"}
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <SuccessAnimation
        show={showSuccess}
        title={`Welcome to ComplaintMS! 🎉`}
        description={`Your ${isAdminRegister ? "admin" : "user"} account has been created successfully. Redirecting to ${isAdminRegister ? "admin dashboard" : "dashboard"}...`}
        onComplete={() => setShowSuccess(false)}
      />
    </>
  )
}
