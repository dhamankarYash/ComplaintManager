"use client"

import { useState } from "react"
import { useAuth } from "@/hooks/use-auth"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { useToast } from "@/hooks/use-toast"
import { MessageSquare, Menu, X, LogOut, User, Shield, Home, Plus, Search, BarChart3 } from "lucide-react"

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { user, logout } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  const handleLogout = () => {
    logout()
    toast({
      title: "Logged Out Successfully! 👋",
      description: "You have been logged out of your account.",
      variant: "success",
    })
    router.push("/")
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <nav className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => router.push(user ? (user.role === "admin" ? "/admin" : "/dashboard") : "/")}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <MessageSquare className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              ComplaintMS
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {user ? (
              // Authenticated user navigation
              <>
                {user.role === "admin" ? (
                  // Admin navigation
                  <>
                    <Button
                      variant="ghost"
                      onClick={() => router.push("/admin")}
                      className="text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
                    >
                      <BarChart3 className="h-4 w-4 mr-2" />
                      Admin Dashboard
                    </Button>
                  </>
                ) : (
                  // Regular user navigation
                  <>
                    <Button
                      variant="ghost"
                      onClick={() => router.push("/dashboard")}
                      className="text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
                    >
                      <Home className="h-4 w-4 mr-2" />
                      Dashboard
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={() => router.push("/complaints/submit")}
                      className="text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Submit Complaint
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={() => router.push("/complaints/track")}
                      className="text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
                    >
                      <Search className="h-4 w-4 mr-2" />
                      Track Progress
                    </Button>
                  </>
                )}

                {/* User info and logout */}
                <div className="flex items-center gap-3 pl-4 border-l border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    {user.role === "admin" ? (
                      <Shield className="h-4 w-4 text-orange-600" />
                    ) : (
                      <User className="h-4 w-4 text-blue-600" />
                    )}
                    <span className="hidden lg:inline">{user.email}</span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleLogout}
                    className="bg-transparent border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-red-50 hover:border-red-200 hover:text-red-600 dark:hover:bg-red-900/20 dark:hover:border-red-800 dark:hover:text-red-400 transition-colors"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                </div>
              </>
            ) : (
              // Unauthenticated user navigation
              <>
                <Button
                  variant="ghost"
                  onClick={() => router.push("/auth/login")}
                  className="text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
                >
                  <User className="h-4 w-4 mr-2" />
                  User Login
                </Button>
                <Button
                  variant="outline"
                  onClick={() => router.push("/auth/login?type=admin")}
                  className="bg-transparent border-orange-200 dark:border-orange-800 text-orange-600 dark:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-900/20 transition-colors"
                >
                  <Shield className="h-4 w-4 mr-2" />
                  Admin Login
                </Button>
              </>
            )}

            <ThemeToggle />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <Button variant="ghost" size="sm" onClick={toggleMenu} className="text-gray-700 dark:text-gray-300">
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-800">
            <div className="flex flex-col gap-2">
              {user ? (
                // Authenticated mobile navigation
                <>
                  {user.role === "admin" ? (
                    // Admin mobile navigation
                    <Button
                      variant="ghost"
                      onClick={() => {
                        router.push("/admin")
                        setIsMenuOpen(false)
                      }}
                      className="justify-start text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400"
                    >
                      <BarChart3 className="h-4 w-4 mr-2" />
                      Admin Dashboard
                    </Button>
                  ) : (
                    // Regular user mobile navigation
                    <>
                      <Button
                        variant="ghost"
                        onClick={() => {
                          router.push("/dashboard")
                          setIsMenuOpen(false)
                        }}
                        className="justify-start text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400"
                      >
                        <Home className="h-4 w-4 mr-2" />
                        Dashboard
                      </Button>
                      <Button
                        variant="ghost"
                        onClick={() => {
                          router.push("/complaints/submit")
                          setIsMenuOpen(false)
                        }}
                        className="justify-start text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Submit Complaint
                      </Button>
                      <Button
                        variant="ghost"
                        onClick={() => {
                          router.push("/complaints/track")
                          setIsMenuOpen(false)
                        }}
                        className="justify-start text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400"
                      >
                        <Search className="h-4 w-4 mr-2" />
                        Track Progress
                      </Button>
                    </>
                  )}

                  <div className="border-t border-gray-200 dark:border-gray-700 pt-2 mt-2">
                    <div className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 dark:text-gray-400">
                      {user.role === "admin" ? (
                        <Shield className="h-4 w-4 text-orange-600" />
                      ) : (
                        <User className="h-4 w-4 text-blue-600" />
                      )}
                      <span>{user.email}</span>
                    </div>
                    <Button
                      variant="ghost"
                      onClick={() => {
                        handleLogout()
                        setIsMenuOpen(false)
                      }}
                      className="justify-start w-full text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </Button>
                  </div>
                </>
              ) : (
                // Unauthenticated mobile navigation
                <>
                  <Button
                    variant="ghost"
                    onClick={() => {
                      router.push("/auth/login")
                      setIsMenuOpen(false)
                    }}
                    className="justify-start text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400"
                  >
                    <User className="h-4 w-4 mr-2" />
                    User Login
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => {
                      router.push("/auth/login?type=admin")
                      setIsMenuOpen(false)
                    }}
                    className="justify-start text-orange-600 dark:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-900/20"
                  >
                    <Shield className="h-4 w-4 mr-2" />
                    Admin Login
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
// ⬇️ UNCOMMENT THE CODE BELOW ⬇️
// import { Navigation } from "@/components/navigation" // This line might be redundant if Navigation is in the same file. You can likely remove it.

export default function DashboardPage() {
  return (
    <>
      <Navigation />
      <main className="p-6">
        <h1 className="text-2xl font-bold">Welcome to your Dashboard</h1>
        {/* Additional dashboard content goes here */}
      </main>
    </>
  )
}
// import { Navigation } from "@/components/navigation"

// export default function DashboardPage() {
//   return (
//     <>
//       <Navigation />
//       <main className="p-6">
//         <h1 className="text-2xl font-bold">Welcome to your Dashboard</h1>
//         {/* Additional dashboard content goes here */}
//       </main>
//     </>
//   )
// }
