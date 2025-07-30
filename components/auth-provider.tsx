// "use client"

// import type React from "react"
// import { createContext, useContext, useEffect, useState } from "react"

// interface User {
//   id: string
//   email: string
//   role: "user" | "admin"
// }

// interface AuthContextType {
//   user: User | null
//   login: (email: string, password: string) => Promise<boolean>
//   register: (email: string, password: string, role?: string) => Promise<boolean>
//   logout: () => void
//   loading: boolean // To indicate if auth check is in progress
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined)

// export function AuthProvider({ children }: { children: React.ReactNode }) {
//   const [user, setUser] = useState<User | null>(null)
//   const [loading, setLoading] = useState(true) // Initially true while checking auth

//   useEffect(() => {
//     checkAuth()
//   }, [])

//   const checkAuth = async () => {
//     try {
//       const token = localStorage.getItem("token")
//       if (!token) {
//         setLoading(false)
//         return
//       }

//       const response = await fetch("/api/auth/verify", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       })

//       if (response.ok) {
//         const userData = await response.json()
//         setUser(userData.user)
//       } else {
//         // Token invalid or expired, remove it
//         localStorage.removeItem("token")
//       }
//     } catch (error) {
//       console.error("Auth check failed:", error)
//       localStorage.removeItem("token")
//     } finally {
//       setLoading(false) // Auth check complete
//     }
//   }

//   const login = async (email: string, password: string): Promise<boolean> => {
//     try {
//       const response = await fetch("/api/auth/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ email, password }),
//       })

//       if (response.ok) {
//         const data = await response.json()
//         localStorage.setItem("token", data.token)
//         setUser(data.user)
//         return true
//       }
//       return false
//     } catch (error) {
//       console.error("Login failed:", error)
//       return false
//     }
//   }

//   const register = async (email: string, password: string, role = "user"): Promise<boolean> => {
//     try {
//       const response = await fetch("/api/auth/register", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ email, password, role }),
//       })

//       if (response.ok) {
//         const data = await response.json()
//         localStorage.setItem("token", data.token)
//         setUser(data.user)
//         return true
//       }
//       return false
//     } catch (error) {
//       console.error("Registration failed:", error)
//       return false
//     }
//   }

//   const logout = () => {
//     localStorage.removeItem("token")
//     setUser(null)
//   }

//   return <AuthContext.Provider value={{ user, login, register, logout, loading }}>{children}</AuthContext.Provider>
// }

// export const useAuth = () => {
//   const context = useContext(AuthContext)
//   if (context === undefined) {
//     throw new Error("useAuth must be used within an AuthProvider")
//   }
//   return context
// }

"use client"

import type React from "react"

import { AuthProvider as AuthContextProvider } from "@/hooks/use-auth"

export function AuthProvider({ children }: { children: React.ReactNode }) {
  return <AuthContextProvider>{children}</AuthContextProvider>
}
