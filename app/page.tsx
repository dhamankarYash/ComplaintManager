"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageSquare, Shield, ArrowRight, CheckCircle, Settings, User, UserCog, Clock } from "lucide-react"

export default function HomePage() {
  const { user, loading } = useAuth()
  const router = useRouter()

  // Redirect authenticated users to their respective dashboards
  useEffect(() => {
    if (!loading && user) {
      if (user.role === "admin") {
        router.push("/admin")
      } else {
        router.push("/dashboard")
      }
    }
  }, [user, loading, router])

  // Show loading while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-purple-900/20 dark:to-indigo-900/20">
        <div className="text-center">
          <MessageSquare className="h-12 w-12 animate-pulse text-purple-600 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-300 text-lg">Loading...</p>
        </div>
      </div>
    )
  }

  // Don't render the landing page if user is authenticated (will redirect)
  if (user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-purple-900/20 dark:to-indigo-900/20">
      <div className="container mx-auto px-4 py-16 md:py-24">
        {/* Hero Section */}
        <div className="text-center mb-16 md:mb-24 animate-fade-in-up">
          <h1 className="text-5xl md:text-7xl font-extrabold bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent leading-tight mb-6">
            Complaint Manager
            <br />
            System
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto mb-8 leading-relaxed">
            Streamline your complaint management process with our comprehensive system designed for efficiency and
            customer satisfaction.
          </p>

          {/* Login Options */}
          <div className="flex flex-col sm:flex-row justify-center gap-6 mb-12">
            <Link href="/auth/login?type=user">
              <Button className="px-8 py-4 text-lg font-semibold bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 rounded-xl min-w-[200px]">
                <User className="mr-2 h-5 w-5" />
                User Login
              </Button>
            </Link>
            <Link href="/auth/login?type=admin">
              <Button className="px-8 py-4 text-lg font-semibold bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 rounded-xl min-w-[200px]">
                <UserCog className="mr-2 h-5 w-5" />
                Admin Login
              </Button>
            </Link>
          </div>

          {/* Quick Actions for Non-logged Users */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
            <Link href="/complaints/submit">
              <Button
                variant="outline"
                className="px-6 py-3 text-base font-semibold bg-white/80 backdrop-blur-sm border-2 border-purple-200 text-purple-700 hover:bg-purple-50 dark:bg-gray-800/80 dark:border-purple-700 dark:text-purple-300 dark:hover:bg-purple-900/20 transition-all duration-300 transform hover:-translate-y-1 rounded-xl"
              >
                Submit Complaint <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/complaints/track">
              <Button
                variant="outline"
                className="px-6 py-3 text-base font-semibold bg-white/80 backdrop-blur-sm border-2 border-blue-200 text-blue-700 hover:bg-blue-50 dark:bg-gray-800/80 dark:border-blue-700 dark:text-blue-300 dark:hover:bg-blue-900/20 transition-all duration-300 transform hover:-translate-y-1 rounded-xl"
              >
                Track Progress
              </Button>
            </Link>
          </div>
        </div>

        {/* Feature Cards Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-16 md:mb-24">
          <Card className="group relative overflow-hidden bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 rounded-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <CardHeader className="pb-4 relative z-10">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <MessageSquare className="h-7 w-7 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold text-gray-800 dark:text-gray-100">Submit Complaints</CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-300">
                Effortlessly submit detailed complaints with our intuitive interface and smart categorization.
              </CardDescription>
            </CardHeader>
            <CardContent className="relative z-10">
              <Link href="/complaints/submit">
                <Button className="w-full gradient-primary text-white hover:shadow-lg transition-all duration-300 rounded-xl">
                  Get Started
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="group relative overflow-hidden bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 rounded-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-teal-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <CardHeader className="pb-4 relative z-10">
              <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-teal-500 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <Clock className="h-7 w-7 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold text-gray-800 dark:text-gray-100">Real-time Tracking</CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-300">
                Monitor complaint progress with live updates, notifications, and detailed status reports.
              </CardDescription>
            </CardHeader>
            <CardContent className="relative z-10">
              <Link href="/complaints/track">
                <Button
                  variant="outline"
                  className="w-full bg-transparent border-green-200 text-green-700 hover:bg-green-50 dark:border-green-700 dark:text-green-300 dark:hover:bg-green-900/20 transition-all duration-300 rounded-xl"
                >
                  Track Now
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="group relative overflow-hidden bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 rounded-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <CardHeader className="pb-4 relative z-10">
              <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <Shield className="h-7 w-7 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold text-gray-800 dark:text-gray-100">Admin Control</CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-300">
                Powerful administrative tools for efficient complaint resolution and team management.
              </CardDescription>
            </CardHeader>
            <CardContent className="relative z-10">
              <Link href="/auth/login?type=admin">
                <Button className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white hover:shadow-lg transition-all duration-300 rounded-xl">
                  Admin Access
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* How It Works Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-12">Three simple steps to resolution</p>
          <div className="grid md:grid-cols-3 gap-10 max-w-5xl mx-auto">
            <div className="group text-center">
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto shadow-xl group-hover:scale-110 transition-transform duration-300">
                  <MessageSquare className="h-10 w-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-sm font-bold text-gray-800">
                  1
                </div>
              </div>
              <h3 className="font-bold text-2xl text-gray-800 dark:text-gray-100 mb-3">Submit</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Fill out our form with detailed information about your complaint for faster processing.
              </p>
            </div>

            <div className="group text-center">
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-teal-500 rounded-full flex items-center justify-center mx-auto shadow-xl group-hover:scale-110 transition-transform duration-300">
                  <Settings className="h-10 w-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-sm font-bold text-gray-800">
                  2
                </div>
              </div>
              <h3 className="font-bold text-2xl text-gray-800 dark:text-gray-100 mb-3">Process</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Our system routes your complaint to the right team with priority scoring and automated workflows.
              </p>
            </div>

            <div className="group text-center">
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto shadow-xl group-hover:scale-110 transition-transform duration-300">
                  <CheckCircle className="h-10 w-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-sm font-bold text-gray-800">
                  3
                </div>
              </div>
              <h3 className="font-bold text-2xl text-gray-800 dark:text-gray-100 mb-3">Resolve</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Get real-time updates and instant notifications when your complaint is resolved with detailed feedback.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 rounded-3xl p-12 text-white">
          <MessageSquare className="h-12 w-12 mx-auto mb-4 text-white" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8 opacity-90">Join our complaint management system today</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/auth/register?type=user">
              <Button className="px-8 py-4 text-lg font-semibold bg-white text-purple-600 hover:bg-gray-100 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 rounded-xl">
                Get Started as User
              </Button>
            </Link>
            <Link href="/auth/register?type=admin">
              <Button className="px-8 py-4 text-lg font-semibold bg-orange-500 text-white hover:bg-orange-600 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 rounded-xl">
                Register as Admin
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
