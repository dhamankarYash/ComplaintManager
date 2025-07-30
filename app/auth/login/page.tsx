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
import { Loader2, Eye, EyeOff, Mail, Lock, LogIn, Shield, User } from "lucide-react"
import { SuccessAnimation } from "@/components/ui/success-animation"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({})
  const { login } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()

  const loginType = searchParams.get("type") || "user"
  const isAdminLogin = loginType === "admin"

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {}

    if (!email) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email"
    }

    if (!password) {
      newErrors.password = "Password is required"
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters"
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
      const success = await login(email, password)
      if (success) {
        setShowSuccess(true)
        toast({
          title: `Welcome ${isAdminLogin ? "Admin" : "User"}! 🎉`,
          description: `You have successfully logged in to your ${isAdminLogin ? "admin" : "user"} account.`,
          variant: "success",
        })

        setTimeout(() => {
          router.push(isAdminLogin ? "/admin" : "/")
        }, 2000)
      } else {
        toast({
          title: "Login Failed ❌",
          description: "Invalid email or password. Please check your credentials and try again.",
          variant: "destructive",
        })

        // Add shake animation to form
        const form = document.querySelector("form")
        form?.classList.add("animate-shake")
        setTimeout(() => form?.classList.remove("animate-shake"), 500)
      }
    } catch (error) {
      toast({
        title: "Connection Error �",
        description: "Unable to connect to the server. Please check your internet connection and try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20 flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-2xl rounded-2xl border-0 animate-fade-in-down">
          <CardHeader className="text-center pb-6 space-y-2">
            <div
              className={`w-16 h-16 ${isAdminLogin ? "bg-gradient-to-br from-orange-500 to-red-500" : "bg-gradient-to-br from-blue-500 to-purple-600"} rounded-2xl flex items-center justify-center mx-auto mb-4`}
            >
              {isAdminLogin ? <Shield className="h-8 w-8 text-white" /> : <User className="h-8 w-8 text-white" />}
            </div>
            <CardTitle
              className={`text-3xl font-bold ${isAdminLogin ? "bg-gradient-to-r from-orange-600 to-red-600" : "bg-gradient-to-r from-blue-600 to-purple-600"} bg-clip-text text-transparent`}
            >
              {isAdminLogin ? "Admin Login 🛡️" : "Welcome Back! 👋"}
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-300">
              {isAdminLogin
                ? "Access your admin dashboard to manage complaints"
                : "Sign in to access your complaint management dashboard"}
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
                    placeholder="Enter your email"
                    className={`pl-10 transition-all duration-200 focus:ring-2 ${isAdminLogin ? "focus:ring-orange-500" : "focus:ring-blue-500"} bg-white/50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600 rounded-xl ${
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
                    placeholder="Enter your password"
                    className={`pl-10 pr-10 transition-all duration-200 focus:ring-2 ${isAdminLogin ? "focus:ring-orange-500" : "focus:ring-blue-500"} bg-white/50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600 rounded-xl ${
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

              <Button
                type="submit"
                className={`w-full py-3 text-lg font-semibold ${isAdminLogin ? "bg-gradient-to-r from-orange-500 to-red-500" : "gradient-primary"} text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-0.5 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed`}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Signing In...
                  </>
                ) : (
                  <>
                    <LogIn className="mr-2 h-5 w-5" />
                    Sign In as {isAdminLogin ? "Admin" : "User"}
                  </>
                )}
              </Button>
            </form>

            <div className="mt-6 text-center space-y-3">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {"Don't have an account? "}
                <Link
                  href={`/auth/register?type=${loginType}`}
                  className={`${isAdminLogin ? "text-orange-600 hover:text-orange-700 dark:text-orange-400 dark:hover:text-orange-300" : "text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"} font-semibold hover:underline transition-colors`}
                >
                  Create one here →
                </Link>
              </p>
              <div className="flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                <span>Switch to:</span>
                <Link
                  href={`/auth/login?type=${isAdminLogin ? "user" : "admin"}`}
                  className={`${isAdminLogin ? "text-blue-600 hover:text-blue-700" : "text-orange-600 hover:text-orange-700"} font-medium hover:underline transition-colors`}
                >
                  {isAdminLogin ? "User Login" : "Admin Login"}
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <SuccessAnimation
        show={showSuccess}
        title={`${isAdminLogin ? "Admin" : "User"} Login Successful! 🎉`}
        description={`Redirecting you to your ${isAdminLogin ? "admin dashboard" : "dashboard"}...`}
        onComplete={() => setShowSuccess(false)}
      />
    </>
  )
}

